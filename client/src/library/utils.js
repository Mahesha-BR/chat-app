export function formatMessageTime(date){
    return new Date(date).toLocaleTimeString("en-INDIA",{
        hour:"2-digit",
        minute:"2-digit",
        hour12:true,
    })
}