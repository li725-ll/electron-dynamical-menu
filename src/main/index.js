const { app, BrowserWindow, Menu } = require("electron");
const EventEmitter = require("events");

const event = new EventEmitter();

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});
	return mainWindow;
}


const menuTemplate = [
	{
		label: "菜单1",
		submenu: [
			{
				label: "菜单1.1",
				type: "radio",
				click: () => {
					event.emit("change-menu", 0);
				}
			},
			{
				type: "radio",
				label: "菜单1.2",
				click: () => {
					event.emit("change-menu", 1);
				}
			},
			{
				type: "radio",
				label: "菜单1.3",
				click: () => {
					event.emit("change-menu", 2);
				}
			}
		]
	},
	{
		label: "菜单2",
		submenu: [
			{
				id: "2.1",
				label: "菜单2.1",
				click: () => {

				}
			},
			{
				id: "2.2",
				label: "菜单2.2",
				click: () => {

				}
			},
			{
				id: "2.3",
				label: "菜单2.3",
				click: () => {

				}
			}
		]
	}
];

function changeMenu2(menu){
	const menu2ID = ["2.1", "2.2", "2.3"];
	const menu2Item = [];
	menu2ID.forEach((item, index) => {
		const menuItem = menu.getMenuItemById(item);
		menuItem.visible = !index;
		menu2Item.push(menuItem);
	});
	event.on("change-menu", (arg)=>{
		menu2Item.forEach((item)=>{
			item.visible = false;
		});
		switch(arg){
			case 0:
				menu2Item[0].visible = true;
				break;
			case 1:
				menu2Item[1].visible = true;
				break;
			default:
				menu2Item[2].visible = true;
				break;
		}
	});
}

app.whenReady().then(() => {
	const menu = Menu.buildFromTemplate(menuTemplate);
	changeMenu2(menu);
	Menu.setApplicationMenu(menu);
	createWindow();
})
