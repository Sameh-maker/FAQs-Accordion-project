// getting some Elements using DOM
const background = document.querySelector('.background')



// creating the desktopImage[here we made it using js to change it through responsive design] 
let desktopImg = document.createElement("img");
desktopImg.src = 'faq-accordion-main/faq-accordion-main/assets/images/background-pattern-desktop.svg';
desktopImg.id = 'desktopImg';
background.appendChild(desktopImg)



// getting the questionsContainer and creating the MainHeader and StarLogo
const QuestionsContainer = document.querySelector('.questionsContainer');
const MainHeader = document.createElement('h1')
MainHeader.innerText = 'faqs'.toUpperCase()



// creating the container for the main header and star Logo
const HeaderAndStarLogo = document.createElement('div')
HeaderAndStarLogo.className = 'HeaderAndLogo'


const StarLogo = document.createElement('img')
StarLogo.src = 'faq-accordion-main/faq-accordion-main/assets/images/icon-star.svg'

HeaderAndStarLogo.appendChild(MainHeader)
HeaderAndStarLogo.appendChild(StarLogo)

QuestionsContainer.appendChild(HeaderAndStarLogo)



// Function to Extract data from Api and organize it in the content
function ExtractData() {
    let promise = new Promise((res, rej) => {
        let QuestionsPageApi = 'Questions page.json'
        let fetchedData = fetch(QuestionsPageApi)
        if (fetchedData) {
            res(fetchedData)
        } else {
            rej('Error')
        }
    });

    promise.then(
        (res) => {
            let response = res.json()
            return response
        }
    ).then(
        (res) => {
            let data = res
            // creating QuestionsAndAnswersContainer
            for (let index = 0; index < data.length; index++) {
                const QuestionsAndAnswersContainer = document.createElement('div');
                QuestionsAndAnswersContainer.classList.add('questionAndAnswer');

                // Question
                const Question = document.createElement('h2');
                Question.innerHTML = `${data[index].Question}`;

                //Answer
                const Answer = document.createElement('p');
                Answer.innerHTML = `${data[index].Answer}`;
                Answer.style.display = 'none';

                // plus icon
                let PlusIcon = document.createElement('img');
                PlusIcon.src = 'faq-accordion-main/faq-accordion-main/assets/images/icon-plus.svg';

                QuestionsAndAnswersContainer.appendChild(Question);
                QuestionsAndAnswersContainer.appendChild(Answer);
                QuestionsAndAnswersContainer.appendChild(PlusIcon);




                QuestionsContainer.appendChild(QuestionsAndAnswersContainer)


                // function that control the Answer display
                PlusIcon.addEventListener('click', () => {
                   
                    if (Answer.style.display === 'none') {
                        Answer.style.display = 'block'
                        PlusIcon.src = 'faq-accordion-main/faq-accordion-main/assets/images/icon-minus.svg'
                    } else {
                        Answer.style.display = 'none'
                        PlusIcon.src = 'faq-accordion-main/faq-accordion-main/assets/images/icon-plus.svg'
                    }

                })
            }
        }
    );
};

ExtractData()