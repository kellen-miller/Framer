// @ts-nocheck
const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const user = {
    getUserInfo: async () => {
        await timeout(200);

        return {token: "OUR_USER_TOKEN"};
    }
};

const testingData = {
    OUR_USER_TOKEN: {
        SHOW_SUGGESTIONS: true,
        OTHER_EXPERIMENT: false
    }
};

export const testing = {
    getTestParticipation: async (userToken) => {
        await timeout(200);

        const userTestingData = testingData[userToken];
        if (!userTestingData) {
            throw new Error("invalid user");
        }
        return userTestingData;
    }
};

const personalizationData = {
    OUR_USER_TOKEN: {
        favoriteBlogs: [
            {id: "blog1", name: "Thyme for Change"},
            {id: "blog2", name: "No Gimmick Food"},
            {id: "blog3", name: "Full Metal Chef"},
            {id: "blog4", name: "FOOD IS FUEL"}
        ],
        suggestedBlogs: [
            {id: "blog5", name: "Welcome to Flavortown"},
            {id: "blog6", name: "Tomato King"},
            {id: "blog7", name: "Burrito Bazaar"}
        ]
    }
};

export const personalization = {
    getPersonalizedBlogs: async (userToken) => {
        await timeout(200);

        const userPersonalizationData = {
            ...personalizationData[userToken]
        };
        if (!userPersonalizationData) {
            throw new Error("invalid user");
        }
        const numSuggested = 5 - userPersonalizationData.favoriteBlogs.length;
        userPersonalizationData.suggestedBlogs = userPersonalizationData.suggestedBlogs.slice(
            0,
            numSuggested
        );
        return userPersonalizationData;
    }
};

export const favorites = {
    saveFavorites: async (newFavorites, userToken) => {
        await timeout(500);

        const oldPersonalizationData = personalizationData[userToken];
        if (!oldPersonalizationData) {
            throw new Error("invalid user");
        }
        personalizationData[userToken].favoriteBlogs = newFavorites;
    }
};

const previewData = {
    blog1: "Braised short ribs are a personal favorite...",
    blog2: "Today we'll dry age steak in asbestos...",
    blog3: "Combining Nina and Alexander's favorite dishes...",
    blog4: "FLAVOR IS FOR NERDS. PROTEIN ONLY...",
    blog5: "My favorite flame print shirts...",
    blog6: "9/10 times, Campari are the way to go!...",
    blog7: "Rice does not belong in a burrito..."
};

export const preview = {
    getBlogPreview: async (blogId) => {
        await timeout(500);

        const blogPreviewData = previewData[blogId];
        if (!blogPreviewData) {
            throw new Error("invalid blog id");
        }
        return blogPreviewData;
    }
};
