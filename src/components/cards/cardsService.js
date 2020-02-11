import { restConnector } from "../../connector/axios";

class CardsService {
    addCard(card) {
        return restConnector({
            url: 'cards',
            method: "POST",
            data: card
        });
    }

    updateCard(updateCard){
        return restConnector({
            url: 'cards',
            method: "PUT",
            data: updateCard
        });
    }

    deleteCard(id) {
        return restConnector({
            url: 'cards',
            method: "DELETE",
            data: { id }
        });
    }
}

export default new CardsService();