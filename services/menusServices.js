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


module.exports = {
    getMenus
};