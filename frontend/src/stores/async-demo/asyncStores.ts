// @ts-nocheck
import {asyncDerived, asyncReadable, asyncWritable, derived} from "@square/svelte-store";
import {page} from "$app/stores";
import {favorites, personalization, preview, testing, user} from "./fake-backend";

// https://github.com/square/svelte-store

const authToken = asyncReadable(
    "",
    async () => {
        return "authToken";
    },
    true
);

const userInfo = asyncReadable(
    {},
    async () => {
        const response = await fetch('https://ourdomain.com/users/info');
        return await response.json();
    },
    true
);

const results = asyncDerived(
    [authToken, page],
    async ([$authToken, $page]) => {
        const requestBody = JSON.stringify({authorization: $authToken});
        const response = await fetch(
            `https://ourdomain.com/list?page=${$page}`,
            requestBody
        );
        return response.json();
    }
);

const shortcuts = asyncWritable(
    [],
    async () => {
        const response = await fetch('https://ourdomain.com/shortcuts');
        return response.json();
    },
    async (newShortcutsList) => {
        const postBody = JSON.stringify({shortcuts: newShortcutsList});
        const response = await fetch('https://ourdomain.com/shortcuts', {
            method: 'POST',
            body: postBody,
        });
        return response.json();
    }
);

const shortcuts2 = asyncWritable(
    authToken,
    async ($authToken) => {
        const requestBody = JSON.stringify({authorization: $authToken});
        const response = await fetch(
            'https://ourdomain.com/shortcuts',
            requestBody
        );
        return response.json();
    },
    async (newShortcutsList, $authToken) => {
        const postBody = JSON.stringify({
            authorization: $authToken,
            shortcuts: newShortcutsList,
        });
        const response = await fetch('https://ourdomain.com/shortcuts', {
            method: 'POST',
            body: postBody,
        });
        return response.json();
    }
);

const userToken = asyncReadable(undefined, async () => {
    const userData = await user.getUserInfo();
    return userData.token;
});

export const shouldShowSuggestions = asyncDerived(
    userToken,
    async ($userToken) => {
        const testFlags = await testing.getTestParticipation($userToken);
        return Boolean(testFlags["SHOW_SUGGESTIONS"]);
    }
);

// We declare personalizedBlogs to be reloadable so that we can fetch
// new suggestions.
const personalizedBlogs = asyncDerived(
    userToken,
    ($userToken) => {
        return personalization.getPersonalizedBlogs($userToken);
    },
    true
);

// Note that this store's GET function is not async, while its SET is.
// asyncWritables only require an async function for its setting.
// We derive from the userPersonalization store to GET data, but from
// userToken to SET data. We use a `_` to indicate values that are unused.
export const favoriteBlogs = asyncWritable(
    [personalizedBlogs, userToken],
    ([$personalizedBlogs, _]) => {
        return $personalizedBlogs?.favoriteBlogs;
    },
    async (newFavorites, [_, $userToken]) => {
        await favorites.saveFavorites(newFavorites, $userToken);
    }
);

export const suggestedBlogs = derived(
    personalizedBlogs,
    ($personalizedBlogs) => {
        return $personalizedBlogs?.suggestedBlogs;
    }
);

// Here we generate promises to load previews for each of the blogShortcuts.
// We await all of these promises and use them to populate a map for the blog id
// to the relevant preview.
// We could make some improvements here! As an exercise try
// dynamically creating stores represent individual previews.
export const blogPreviews = asyncDerived(
    [favoriteBlogs, suggestedBlogs],
    async ([$favoriteBlogs, $suggestedBlogs]) => {
        const blogPreviewsById = {};
        const allBlogs = [...$favoriteBlogs, ...$suggestedBlogs];
        const loadPreviewPromises = allBlogs.map(async (blog) => {
            blogPreviewsById[blog.id] = await preview.getBlogPreview(blog.id);
        });
        await Promise.all(loadPreviewPromises);
        return blogPreviewsById;
    }
);

//try {
//   await myAsyncStore.set('set state');
// } catch {
//   await myAsyncStore.set('laoded state');
// }