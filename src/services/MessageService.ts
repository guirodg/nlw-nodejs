import { getCustomRepository } from "typeorm"
import { MessagesRepository } from "../repositories/MessageRepository"

interface IMessageCreate {
    admin_id?: string;
    text: string;
    user_id: string;
}


class MessageService {
    async create({admin_id, text, user_id}: IMessageCreate) {
        const messageRepository = getCustomRepository(MessagesRepository);

        const message = messageRepository.create({
            admin_id,
            text,
            user_id
        });

        await messageRepository.save(message);

        return message;
    }
}

export { MessageService }