'use babel';

import Test1View from './test1-view';
import { CompositeDisposable } from 'atom';

export default {

  test1View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.test1View = new Test1View(state.test1ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.test1View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test1:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.test1View.destroy();
  },

  serialize() {
    return {
      test1ViewState: this.test1View.serialize()
    };
  },

  toggle() {
    console.log('Test1 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
