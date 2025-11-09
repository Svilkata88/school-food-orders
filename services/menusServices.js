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

function saveMenu(menuTitle, days, creator) {
  const menusFilePath = './menus.json';
  const menu = { menuTitle, days, creator };

  // Read current menus
  let menus = [];
  if (fs.existsSync(menusFilePath)) {
    const fileData = fs.readFileSync(menusFilePath, 'utf-8');
    menus = fileData ? JSON.parse(fileData) : [];
  }

  // Find existing menu
  const index = menus.findIndex(m => m.menuTitle === menuTitle);

  if (index !== -1) {
    // ✅ Update existing
    menus[index].days = days;
    console.log(`Updated menu "${menuTitle}"`);
  } else {
    // ✅ Add new
    menus.push(menu);
    console.log(`Added new menu "${menuTitle}"`);
  }

  // ✅ Save changes every time
  fs.writeFileSync(menusFilePath, JSON.stringify(menus, null, 2));
}



module.exports = {
    getMenus,
    saveMenu,
};