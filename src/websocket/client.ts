import { io } from "../http";
import { ConnectionService } from "../services/ConnectionService";
import { UsersService } from "../services/UsersService";
import { MessageService } from "../services/MessageService";

interface IParams {
    text: string;
    email: string;
}

io.on("connect", (socket) => {
    const connectionsService = new ConnectionService;
    const usersService = new UsersService;
    const messageService = new MessageService;


    socket.on("client_first_acess", async (params) => {
        const socket_id = socket.id;
        const { text, email } = params as IParams;
        let user_id = null;


        const userExists = await usersService.create(email);

        if(!userExists) {
            const user = await usersService.create(email);

            await connectionsService.create({
                socket_id,
                user_id: user.id
            })

            user_id = user.id;
        } else {
            user_id = userExists.id;
            const connection = await connectionsService.findByUserId(userExists.id);

            if(!connection) {
                await connectionsService.create({
                    socket_id,
                    user_id: userExists.id
                })
            }else {
                connection.socket_id = socket_id;
                await connectionsService.create(connection);
            }
        }

        await messageService.create({
            text,
            user_id,
        });
    });
});