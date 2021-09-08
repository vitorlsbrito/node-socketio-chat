import { serverHttp } from './http.js';
import './websocket.js';


serverHttp.listen(3000, () => console.log('🔥 Server is running at http://localhost:3000'));
