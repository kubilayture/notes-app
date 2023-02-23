export class Note {
  id: string;
  content: string;
  priority: string;

  constructor({ id = Date.now().toString(), content = '', priority = "Orta" } = {}) {
    this.id = id;
    this.content = content;
    this.priority = priority;
  }
}
