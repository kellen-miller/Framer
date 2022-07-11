/**
 * Svelte action that dispatches a custom stuck event when a node becomes stuck or unstuck (position: sticky is having an effect)
 * @param node  - the node the action is placed on
 * @param stickToTop
 */
export const sticky = (node: HTMLElement, stickToTop: boolean) => {
    const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
        // only observing one item at a time
        const entry = entries[0];

        let isStuck = false;
        if (entry != undefined && !entry.isIntersecting && isValidYPosition(entry)) {
            isStuck = true;
        }

        node.dispatchEvent(new CustomEvent('stuck', {
            detail: {isStuck}
        }));
    };

    const isValidYPosition = ({target, boundingClientRect}: IntersectionObserverEntry) => {
        if (target === stickySentinelTop) {
            return boundingClientRect.y < 0;
        } else {
            return boundingClientRect.y > 0;
        }
    };

    const mutationCallback = (mutations: MutationRecord[]) => {
        // If something changes and the sentinel nodes are no longer first and last child, put them back in position
        mutations.forEach(() => {
            const {parentNode: topParent} = stickySentinelTop;
            const {parentNode: bottomParent} = stickySentinelBottom;

            if (topParent != null && stickySentinelTop !== topParent.firstChild) {
                topParent.prepend(stickySentinelTop);
            }
            if (bottomParent != null && stickySentinelBottom !== bottomParent.lastChild) {
                bottomParent.append(stickySentinelBottom);
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(intersectionCallback, {});
    const mutationObserver = new MutationObserver(mutationCallback);

    // we insert and observe a sentinel node immediately after the target
    // when it is visible, the target node cannot be sticking
    const sentinelStyle = 'position: absolute; height: 1px;';
    const stickySentinelTop: HTMLElement = document.createElement('div');
    stickySentinelTop.classList.add('stickySentinelTop');
    // without setting a height, Safari breaks
    stickySentinelTop.setAttribute("style", sentinelStyle);
    if (node.parentNode) node.parentNode.prepend(stickySentinelTop);

    const stickySentinelBottom = document.createElement('div');
    stickySentinelBottom.classList.add('stickySentinelBottom');
    stickySentinelBottom.setAttribute("style", sentinelStyle);
    if (node.parentNode) node.parentNode.append(stickySentinelBottom);

    if (stickToTop) {
        intersectionObserver.observe(stickySentinelTop);
    } else {
        intersectionObserver.observe(stickySentinelBottom);
    }

    if (node.parentNode) {
        mutationObserver.observe(node.parentNode, {childList: true});
    }

    return {
        update(stickToTopUpdate: boolean) {
            // change which sentinel we are observing
            if (stickToTopUpdate) {
                intersectionObserver.unobserve(stickySentinelBottom);
                intersectionObserver.observe(stickySentinelTop);
            } else {
                intersectionObserver.unobserve(stickySentinelTop);
                intersectionObserver.observe(stickySentinelBottom);
            }
        },

        destroy() {
            intersectionObserver.disconnect();
            mutationObserver.disconnect();
        }
    };
}