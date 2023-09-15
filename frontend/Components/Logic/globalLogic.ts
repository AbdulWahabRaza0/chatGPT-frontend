export const reloadRecentMessageById = (data: [], activeRecent: string) => {
  if (Boolean(activeRecent)) {
    const messages: any = data.filter((val: any) => val._id === activeRecent);
    if (Boolean(messages[0])) {
      // setAllMessages(messages[0].messages);
      return messages[0].messages;
    } else {
      return [];
    }
  }
};
export const reloadImageMessageById = (data: [], activeImageGen: string) => {
  if (Boolean(activeImageGen)) {
    const messages: any = data.filter((val: any) => val._id === activeImageGen);
    if (Boolean(messages[0])) {
      return messages[0].messages;
    } else {
      return [];
    }
  }
};
