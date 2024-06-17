import { MessageType, Position } from "../enums/sweet-alert.enum";
import { CancelButtonText, ConfirmButtonText, MessageText, MessageTitle } from "./sweet-message";

export const SweetStatus = {
    sweetSucces:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.Success,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    },
    serverError:{
        position: Position.TopRight,
        messageTitle: MessageTitle.Error,
        messageText: MessageText.ServerError,
        icon: MessageType.Error,
        timerProgressBar: true,
        toast: true,
        delay: 1,
    },
    deletedQuestion:{
        position: Position.Center,
        messageTitle: MessageTitle.DeletedQuestion,
        messageText: MessageText.NoTurningBack,
        icon: MessageType.Warning,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: ConfirmButtonText.Okey,
        cancelButtonText: CancelButtonText.Cancel,
    }
}