import React from 'react';
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal';
import './App.css';
import './scss/App.sass';
import {tourInfo, tourDiscountInfo, privateToursInfo} from './data/tourInfo';

function scrollToElement(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({behavior: 'smooth'});
  } else {
    console.error(`No element found with ID ${id}`);
  }
}

function HighlightLineHeader(props) {
  const highlightLineClass = 'highlight-line ' + (props.lineOptions !== undefined ? props.lineOptions : '');

  const fontSize = props.fontSize === undefined ? 80 : Number(props.fontSize);
  const halfHeight = `${(fontSize + 6) / 2}px`;
  const styles = {
    highlightLine: {
      fontSize: `${fontSize}px`,
      height: `${fontSize + 6}px`
    },
    lineTriangleLeft: {
      borderTopWidth: halfHeight,
      borderBottomWidth: halfHeight
    },
    lineTriangleRight: {
      borderTopWidth: halfHeight,
      borderBottomWidth: halfHeight
    },
    lineBody: {
      lineHeight: `${fontSize + 9}px`
    }
  };

  return (
    <>
      <div className={highlightLineClass} style={styles.highlightLine}>
        <span className="line-triangle-left" style={styles.lineTriangleLeft}></span>
        <span className="line-body" style={styles.lineBody}>{props.text}</span>
        <span className="line-triangle-right" style={styles.lineTriangleRight}></span>
      </div>
    </>
  );
}

function Header() {
  return (
    <header>
      <div className="centered">
        <div className="logo"></div>
        <ul className="header-menu">
          <li><a onClick={() => scrollToElement('everydaytours')}>Ежедневные</a></li>
          <li className="grey-text">|</li>
          <li><a onClick={() => scrollToElement('privatetours')}>Частные</a></li>
          <li className="grey-text">|</li>
          <li><a onClick={() => scrollToElement('grouptours')}>Для групп</a></li>
        </ul>
        <span className="flex-space"></span>
        <div className="phone-number">
          <a href="tel:79998887766" className="phone-num">+7 (999) 888-77-66</a>
          <br/>
          <a href="#" className="phone-number-label">ЗАДАТЬ ВОПРОС</a>
        </div>
      </div>
    </header>
  );
}

function Footer(props) {
  return (
    <footer>
      <div className="centered">
        <div className="logo"></div>
        <p className="bold">Приходите. Вам очень понравится.</p>
        <span className="flex-space"></span>
        <p className="bold">+7 (999) 888-77-66</p>
      </div>
    </footer>
  );
}

function HighlightedParagraph(props) {
  const className = 'highlighted-paragraph ' + props.className;
  return (
    <p className={className}>{props.children}</p>
  );
}

function Button(props) {
  const buttonClasses = 'button-yellow ' + props.btnClass;
  return (
    <button type="button" className={buttonClasses} onClick={props.onClick}>{props.label}</button>
  );
}

function ArticleBlock(props) {
  let bg = props.background !== undefined ? props.background : '';
  const style = {
    backgroundImage: `url(${bg})`,
    height: `${props.height}px`
  };
  return (
    <article id={props.id} className="article-bg" style={style}>
      <div className="column-flex-container centered">
        {props.children}
      </div>
    </article>
  );
}

function TabButtons(props) {
  const [activeTab, setActiveTab] = React.useState(0);

  const buttons = props.buttons.map((val, index) => {
      const tabClickFunc = () => {
        if (activeTab === index) return;
        setActiveTab(index);
      };
      return <div key={index} className={activeTab == index ? 'tab-button active' : 'tab-button'}
                  onClick={tabClickFunc}>{val.label}</div>;
    }
  );
  return (
    <>
      <div className="tab-buttons-wrapper">{buttons}</div>
      {props.buttons[activeTab].children}
    </>
  );
}

function TourBlock(props) {
  function ShortInfo(props) {
    return (
      <div className="short-info-element">
        <p className="short-info-label">{props.label}</p>
        <img src={props.icon} alt="" className="short-info-icon"/>
        <p className="short-info-main">{props.info}</p>
      </div>
    );
  }

  return (
    <>
      <div className="tour-block">
        <div className="tour-block-element tour-image">
          <img src={props.tourInfo.image} alt=""/>
        </div>
        <div className="tour-block-element tour-short-info">
          <ShortInfo label="начало:" icon="icons/clock.svg" info={props.tourInfo.startTime}/>
          <ShortInfo label="длительность:" icon="icons/hourglass.svg" info={props.tourInfo.duration}/>
          <ShortInfo label={<>цена<br/>для взрослого:</>} icon="icons/person.svg"
                     info={<>{props.tourInfo.adultPrice} р.</>}/>
          <ShortInfo label={<>цена<br/>для студента:</>} icon="icons/student.png"
                     info={<>{props.tourInfo.studentPrice} р.</>}/>
        </div>
        <div className="tour-block-element tour-description">
          <h3>{props.tourInfo.name}</h3>
          <p>{props.tourInfo.descr}</p>
          <div className="flex-space"></div>
          <Button label="Записаться прямо сейчас"/>
          <a href="#" className="red-link flex-center">УЗНАТЬ ПОДРОБНОСТИ</a>
        </div>
      </div>
    </>
  );
}

function ToursBlock(props) {
  const tours = props.tours.map((val, index) =>
    <TourBlock key={index} tourInfo={val}/>
  );
  return (
    <>
      {tours}
    </>
  );
}

function TimeTableElement(props) {
  function ShortInfo(props) {
    return (
      <div className="short-info-element">
        <img src={props.icon} alt="" className="short-info-icon"/>
        <span className="short-info-main">{props.info}</span>
      </div>
    );
  }

  return (
    <>
      <div className="time-table-element">
        <div className="image">
          <img src={props.tourInfo.image} alt={props.tourInfo.name}/>
        </div>
        <div className="description">
          <div className="info-header">
            <h3>{props.tourInfo.name}</h3>
            <a href="#" className="red-link">ЗАПИСАТЬСЯ</a>
          </div>
          <hr/>
          <div className="short-info">
            <ShortInfo icon="icons/clock.svg" info={props.tourInfo.startTime}/>
            <span className="short-info-label">Цена:</span>
            <ShortInfo icon="icons/person.svg" info={<>{props.tourInfo.adultPrice} р.</>}/>
            <ShortInfo icon="icons/student.png" info={<>{props.tourInfo.studentPrice} р.</>}/>
          </div>
        </div>
      </div>
    </>
  );
}

function TimeTable(props) {
  const timeTableElems = props.tours.map((val, index) =>
    <TimeTableElement key={index} tourInfo={val}/>
  );
  return (
    <>
      {timeTableElems}
    </>
  );
}

function InputField(props) {
  // props.id
  // props.type
  // props.icon
  // props.label
  // props.placeholder
  //
  return (
    <>
      {props.label !== undefined && <label htmlFor={props.id}>{props.label}</label>}
      <div className="text-field">
        <img src={props.icon} alt=""/>
        <input id={props.id} type={props.type} className="text-field__input" placeholder={props.placeholder} min={props.min}/>
      </div>
    </>
  );
}

function GroupTourInfoModal(props) {
  return (
    <Modal open={props.open} onClose={props.onClose} center classNames={{modal: 'customModal'}} animationDuration={0}>
      <div className="group-tours-modal">
        <div className="modal-header">
          <h2>VIP-group tour</h2>
          <h3>ЗАПИШИТЕСЬ НА ЭКСКУРСИЮ ПРЯМО СЕЙЧАС</h3>
        </div>
        <div className="modal-body">
          <InputField id="groupTourDateInput" label="Дата:" icon="icons/calendar.svg" type="date" placeholder="Выберите дату"/>
          <InputField id="groupTourNameInput" label="Имя:"  icon="icons/person.svg" type="text" placeholder="Иван"/>
          <InputField id="groupTourMailInput" label="Ваш E-mail:" icon="icons/mail.svg" type="email" placeholder="example@domain.ru"/>
          <label>Участники:</label>
          <div className="tour-participants">
            <div>
              <InputField id="groupTourMailInput" label="Взрослых" icon="icons/person.svg" type="number" placeholder="0" min={0}/>
            </div>
            <div>
              <InputField id="groupTourMailInput" label="Студентов" icon="icons/student.png" type="number" placeholder="0" min={0}/>
            </div>
            <div>
              <InputField id="groupTourMailInput" label="Детей" icon="icons/child.svg" type="number" placeholder="0" min={0}/>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <br/>
          <Button label="ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ" btnClass="big"/>
        </div>
      </div>
    </Modal>
  );
}

function App() {
  const [groupModalOpen, setGroupModalOpen] = React.useState(false);
  const onOpenGroupModal = () => setGroupModalOpen(true);
  const onCloseGroupModal = () => setGroupModalOpen(false);

  return (
    <>
      <Header/>

      <ArticleBlock background="img/bg.png" height="900">
        <HighlightLineHeader text="САМЫЕ РЕКОМЕНДУЕМЫЕ" lineOptions="red-line" fontSize="72"/>
        <HighlightLineHeader text="ЭКСКУРСИИ ВЛАДИВОСТОКА" lineOptions="red-line bold" fontSize="72"/>
        <HighlightedParagraph>Мы с Вами с 1965 года!</HighlightedParagraph>
        <br/>
        <Button label="ХОЧУ НА ЭКСКУРСИЮ" btnClass="big" onClick={() => scrollToElement('everydaytours')}/>
      </ArticleBlock>

      <ArticleBlock id="everydaytours">
        <HighlightLineHeader text="ЭТО ДОЛЖЕН" lineOptions="unsaturated-blue-line bold" fontSize="65"/>
        <HighlightLineHeader text="УВИДЕТЬ КАЖДЫЙ" lineOptions="unsaturated-blue-line bold" fontSize="65"/>
        <p><span className="bold">Ежедневные</span> экскурсии по фиксированному расписанию</p>
        <TabButtons buttons={[{
          label: 'Экскурсии',
          children: <ToursBlock tours={tourInfo}/>
        }, {
          label: 'Расписание',
          children: <TimeTable tours={tourInfo}/>
        }]}/>
      </ArticleBlock>
      <ArticleBlock background="img/vladivostok-evening-lights.jpeg">
        <HighlightLineHeader text="СКИДКА 15%" lineOptions="yellow-line bold black-text" fontSize="80"/>
        <HighlightLineHeader text="НА ЕЖЕДНЕВНЫЕ ТУРЫ" lineOptions="yellow-line bold black-text" fontSize="80"/>
        <br/>
        <HighlightedParagraph className="medium yellow-text font-size-36 near">Свежее
          предложение!</HighlightedParagraph>
        <br/>
        <HighlightedParagraph className="font-size-24 near">Билет на 3 ежедневные экскурсии по расписанию, действующий в
          течение 7 дней.</HighlightedParagraph>
        <HighlightedParagraph className="font-size-24 near">Покупая его, Вы платите на 15% меньше, чем за
          каждую</HighlightedParagraph>
        <HighlightedParagraph className="font-size-24">эскурсию в отдельности.</HighlightedParagraph>
        <TimeTable tours={tourDiscountInfo}/>
        <div className="discount-block">
          <p className="font-size-24 medium">Стоимость без скидки: <span className="bold">5200 Р</span></p>
          <p className="font-size-60 medium yellow-text">Скидка: <span className="bold">-15%</span></p>
          <p className="font-size-36 medium">Итого со скидкой: <span className="bold">4420 Р</span></p>
        </div>
        <Button label="УЧАСТВОВАТЬ В АКЦИИ" btnClass="big"/>
      </ArticleBlock>
      <ArticleBlock background="img/free-tour-bg.jpg">
        <HighlightLineHeader text="ЗАПИШИТЕСЬ НА" lineOptions="red-line bold" fontSize="80"/>
        <HighlightLineHeader text="ПРОБНУЮ БЕСПЛАТНУЮ" lineOptions="red-line bold" fontSize="80"/>
        <HighlightLineHeader text="ЭКСКУРСИЮ" lineOptions="red-line bold" fontSize="80"/>
        <br/>
        <br/>
        <HighlightedParagraph className="medium yellow-text font-size-36 near">Каждый день в
          10:00</HighlightedParagraph>
        <br/>
        <HighlightedParagraph className="font-size-24 near">За 2.5 часа Вы увидите самые главные
          места</HighlightedParagraph>
        <HighlightedParagraph className="font-size-24 near">Владивостока и сможете оцените работу наших
          гидов.</HighlightedParagraph>
        <br/>
        <br/>
        <div className="input-fields-row">
          <InputField id="nameInput" icon="icons/person.svg" type="text" placeholder="Имя"/>
          <InputField id="emailInput" icon="icons/mail.svg" type="email" placeholder="Укажите Ваш E-mail"/>
          <InputField id="dateInput" icon="icons/calendar.svg" type="date" placeholder="Выберите дату"/>
        </div>
        <br/>
        <br/>
        <Button label="ЗАПИСАТЬСЯ НА БЕСПЛАТНУЮ ЭКСКУРСИЮ" btnClass="big"/>
      </ArticleBlock>
      <ArticleBlock id="privatetours">
        <HighlightLineHeader text="ОТКРОЙТЕ" lineOptions="unsaturated-blue-line bold" fontSize="65"/>
        <HighlightLineHeader text="СВОЙ ВЛАДИВОСТОК" lineOptions="unsaturated-blue-line bold" fontSize="65"/>
        <p><span className="bold">Частные туры</span> по предварительной записи.</p>
        <ToursBlock tours={privateToursInfo}/>
      </ArticleBlock>
      <ArticleBlock id="grouptours" background="img/group-toor-bg.jpg">
        <HighlightLineHeader text="ТУРЫ ДЛЯ" lineOptions="yellow-line bold black-text" fontSize="80"/>
        <HighlightLineHeader text="БОЛЬШИХ ГРУПП" lineOptions="yellow-line bold black-text" fontSize="80"/>
        <br/>
        <div className="group-tours">
          <div className="group-tours-column">
            <div className="group-tours-image">
              <img src="icons/student.png" alt=""/>
            </div>
            <HighlightedParagraph className="font-size-30 center medium near yellow">Экскурсии</HighlightedParagraph>
            <HighlightedParagraph className="font-size-30 center medium near yellow">для
              школьников</HighlightedParagraph>
            <span className="flex-space"></span>
            <Button label="УЗНАТЬ ПОДРОБНОСТИ" btnClass="small"/>
          </div>
          <div className="group-tours-column">
            <div className="group-tours-image">
              <img src="icons/star.svg" alt=""/>
            </div>
            <HighlightedParagraph className="font-size-30 center medium near yellow">Экскурсии</HighlightedParagraph>
            <HighlightedParagraph className="font-size-30 center medium near yellow">для
              VIP-гостей</HighlightedParagraph>
            <HighlightedParagraph className="font-size-30 center medium near yellow">и партнеров</HighlightedParagraph>
            <span className="flex-space"></span>
            <Button label="УЗНАТЬ ПОДРОБНОСТИ" btnClass="small" onClick={onOpenGroupModal}/>
          </div>
          <div className="group-tours-column">
            <div className="group-tours-image">
              <img src="icons/group.svg" alt=""/>
            </div>
            <HighlightedParagraph className="font-size-30 center medium near yellow">Экскурсии</HighlightedParagraph>
            <HighlightedParagraph className="font-size-30 center medium near yellow">для
              иностранных</HighlightedParagraph>
            <HighlightedParagraph className="font-size-30 center medium near yellow">групп</HighlightedParagraph>
            <span className="flex-space"></span>
            <Button label="УЗНАТЬ ПОДРОБНОСТИ" btnClass="small"/>
          </div>
        </div>
        <br/>
        <br/>
        <HighlightedParagraph className="font-size-24 near">Путешествуете большой группой и хотите заказать групповой
          тур?</HighlightedParagraph>
        <HighlightedParagraph className="font-size-24 near">Мы предлагаем высокое качество обслуживания по лучшим
          ценам.</HighlightedParagraph>
        <HighlightedParagraph className="font-size-24 near">Разработаем увлекательный маршрут для Вашей группы,
          предоставим</HighlightedParagraph>
        <HighlightedParagraph className="font-size-24 near">транспорт и учтем любые пожелания.</HighlightedParagraph>
      </ArticleBlock>
      <Footer/>
      <GroupTourInfoModal open={groupModalOpen} onClose={onCloseGroupModal}/>
    </>
  );
}

export default App;
