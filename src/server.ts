import { http } from "./http";
import "./websocket/client"

http.listen(3333, () => console.log("Serve is running on port 3333 💙"));