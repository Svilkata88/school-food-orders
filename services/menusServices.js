const fs = require('fs');

function getMenus() {
    const menusFilePath = './menus.json';
    if (fs.existsSync(menusFilePath)) {
        const menusData = fs.readFileSync(menusFilePath, 'utf-8');
        if (menusData.trim().length === 0) {
            // file exists but is empty
            return [];
        }
        try {
            return JSON.parse(menusData);
        } catch (err) {
            console.error('Invalid JSON in menus.json:', err.message);
            return [];
        }
    }
}

function saveMenu(menuTitle, days) {
    const menusFilePath = './menus.json';
    const menu = { menuTitle, days};

    const menus = fs.readFileSync(menusFilePath, 'utf-8');
    
    if(!menus) {
        fs.writeFileSync(menusFilePath, JSON.stringify([menu], null, 2));
        console.log('First menu saved successfully.');
    }
    else {
        const menusArray = JSON.parse(menus);
        menusArray.push(menu);
        fs.writeFileSync(menusFilePath, JSON.stringify(menusArray, null, 2));
        console.log('Menu added successfully.');
    }
}


module.exports = {
    getMenus,
    saveMenu,
};