export class DialogSuccessInterface {
    title?: string;
    content?: string;
    closeButtonLabel?: string;
  
    constructor(data?: DialogSuccessInterface) {
      if (data) {
        this.title = data.title;
        this.content = data.content;
        this.closeButtonLabel = data.closeButtonLabel;
      }
    }
  }