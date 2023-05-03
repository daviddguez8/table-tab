export const deleteItemFromTab = (tab, toDeleteIdx) => {
    const newTab =  tab.filter((item, idx) => {
        return idx !== toDeleteIdx;
    });

    return newTab;
}