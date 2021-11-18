import moment from "moment";
export const showToast = (msg, type = "success") => {
    if (msg) {
        console.log(msg, type);
        // app.$toast.open({
        //     message: msg,
        //     type: type
        //     // all of other options may go here
        // });
    }
};

export const transTime = (string) => {
    let date = new Date(string);
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

export const transType = (status, type) => {
    let color = "";
    let statusText = "";
    switch (status) {
        case 0:
            color = "no-available";
            statusText = "停止營運";
            break;
        case 1:
            color = "available";
            statusText = "正常營運";
            break;
        case 2:
            color = "no-rent";
            statusText = "暫停營運";
            break;
        default:
            break;
    }
    if (type === "color") return color;
    return statusText;
};
