import template from '../../templates/text.template';
import Component from '../../core/component';
import messageStore from '../../store/message';

const { state } = messageStore;

export default class Text extends Component {
  constructor() {
    super({ template, state });
    messageStore.subscribe('message', this.overWrite);
  }

  overWrite() {
    const textEl = document.querySelector('.text-field');
    textEl.innerHTML = `${state.message}`;
    console.log('Overwrite');
  }
}

// 1. Input 컴포넌트에서 messageStore 업데이트
// 2. Text 컴포넌트에서 message 관련 함수 정의 후 store의 observer 객체에 등록
