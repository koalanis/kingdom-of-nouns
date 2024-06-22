const initialSubject: string = "Posts";

const PREFIX_BANK = ["ContextAware", "Generic", "Abstract", "Instantiable"];
const POSTFIX_BANK = ["Connector", "Manager", "Factory", "Singleton", "Handler", "Bridge", "Adapter", "Gateway", "Builder"];



type NounSoupState = {
  pre: string[]
  subject: string;
  post: string[]
}

const emptyNounSoupState = (): NounSoupState => ({
  pre: [],
  post: [],
  subject: initialSubject
});

var nounSoupState: NounSoupState = emptyNounSoupState();

function randomTake1(list: string[]): string {
  const index  = Math.floor(Math.random()*list.length);
  return list[index];
}


export function nounifyInit() {
  nounifyRender(nounSoupState);


  const subjectInput = document.getElementById("nounify-subject");
  if (subjectInput) {
    subjectInput.setAttribute("value", initialSubject)
    subjectInput.addEventListener("input", (event: Event) => {
      const noun = (event.target as HTMLInputElement).value || "";
      nounSoupState.subject = noun
      nounifyRender(nounSoupState)
    })
  }

  const enterpriseifyButton = document.getElementById("nounify-action-button");
  if (enterpriseifyButton) {
    enterpriseifyButton.addEventListener("click", (event: Event) => {
      applyEnterpriseStep(nounSoupState)
      nounifyRender(nounSoupState)
    })
  }

  const resetButton = document.getElementById("nounify-reset");
  if (resetButton) {
    resetButton.addEventListener("click", (event: Event) => {
      nounSoupState = emptyNounSoupState();
      nounifyRender(nounSoupState)
    })
  }
}

function applyEnterpriseStep(config: NounSoupState) {
  
  if(Math.random() < 0.9) {
    const newPostfix = randomTake1(POSTFIX_BANK);
    config.post.push(newPostfix)
  } else {
    const newPrefix =  randomTake1(PREFIX_BANK);
    config.pre.push(newPrefix)
  }
}

function nounifyApplyString(config: NounSoupState): string {
  const prefix = config.pre.join("");
  const postfix = config.post.join("");
  return `${prefix}${config.subject}${postfix}`;
}

function nounifyWriteToStage(val: string) {
  const node = document.getElementById("nounify-stage");
  if (node) node.innerHTML = val;
}

function nounifyRender(config: NounSoupState) {
  const toRender = !!config.subject ? nounifyApplyString(config) : "What do you need help naming?";
  nounifyWriteToStage(toRender)

}