export default function createGenerator() {
  function generateSimpleId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function generateUUID() {
    var dateTime = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dateTime + Math.random() * 16) % 16 | 0;
      dateTime = Math.floor(dateTime / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  return {
    generateSimpleId,
    generateUUID
  }
}