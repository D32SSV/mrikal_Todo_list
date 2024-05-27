const SharedList = require("../model/SharedList");

class NotificationService {

    static async findAllNotification(userId) {
        try{
            const notifications = await SharedList.findAll({
            where: {isAdded: false, userId: userId},
            attributes: ["id", "title", "description", "isAdded"],
            });
            return notifications;
        } catch(err){
            console.error("Error fetching:", err);
            throw new Error("Notification fetch failure");
        }
    }

    static async deleteOneNotification(listId, userId){
        try{
            const rowsAffected = await SharedList.destroy({
            where: {id: listId, isAdded: false, userId: userId},
            });
            return rowsAffected;
        } catch(err){
            console.error("Error deleting:", err);
            throw new Error("Notification deletion failed");   
        }
    }

    static async updateOneNotification(listId) {
        try{
            const [rowsAffected] = await SharedList.update(
              { isAdded: true },{where: {id: listId}
            });
            return rowsAffected;
        } catch(err){
            console.error("Error updating:", err);
            throw new Error("Notification updation failure");    
        }
    }

}

module.exports = NotificationService;