import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';


const editor = grapesjs.init({
    container: '#gjs',
    fromElement: true,
    height: '300px',
    width: 'auto',
    storageManager: false,
    panels: {defaults: []},
});