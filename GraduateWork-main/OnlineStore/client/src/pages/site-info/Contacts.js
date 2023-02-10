import React from 'react';

const Contacts = () => {
    return (
        <div>
            <h1>Контакты</h1>
            <br/>
            <p>Друзья, мы работаем для вас ежедневно с 10:00 до 20:00.<br></br>
                в субботу, воскресенье, и в праздничные дни с 10:00 до 20:00.<br></br>
                График работы пункта самовывоза (шоурума): Ежедневно 11:00 до 20:00. <br></br>
            </p>
            <p><b>Внимание:</b> при самовывозе необходимо заранее оформить заказ. Не забудьте связаться с нами перед
                приездом.</p>
            <br/>
            <p>Вы всегда сможете получить техническую поддержку и консультацию по ассортименту наших товаров следующими
                способами:</p>
            <br/>
            <ul style={{listStyleType: 'square', fontSize: 18 + 'px !important'}}>
                <li>Cделав заказ на нашем сайте в любой день недели и в любое время суток</li><br></br>
                <li>По многоканальным телефонам в Москве:</li><br></br>
                <ul style={{listStyleType: 'square', fontSize: 18 + 'px !important', lineHeight: 2}}>
                    <li><a href="tel:+74997033667"><span>8 (499) 703-36-67</span></a></li>
                    <li><a href="tel:+74959434943"><span>8 (495) 943-49-43</span></a></li>
                    <li><a href="tel:+74951804130"><span>8 (495) 180-41-30</span></a>   (Не дозвонились? Дополнительный телефон для связи: 8 (916) 034-80-34)</li>
                </ul><br></br>
                <li>Вы также можете связаться с нами с помощью мессенджеров: <a href="https://api.whatsapp.com/send?phone=79160348034" target="_blank" rel="noopener"><span>WhatsApp</span></a>, <a href="https://t.me/BigGeekHelp_bot" target="_blank" rel="noopener"><span>Telegram</span></a></li><br></br>
                <li>При помощи online-консультанта на нашем сайте. Просто нажмите на кнопку "Нужна помощь?" в нижнем правом углу экрана</li><br></br>
                <li>В наших профилях в социальных сетях:</li><br></br>
                <ul style={{listStyleType: 'square', fontSize: 18 + 'px !important', lineHeight: 2}}>
                    <li><a href="http://vk.com/biggeekru" target="_blank" rel="noopener"><span>BIG GEEK Вконтакте</span></a></li>
                    <li><a href="https://t.me/biggeek" target="_blank" rel="noopener"><span>BIG GEEK Телеграм</span></a></li>
                    <li><a href="http://twitter.com/biggeekru" target="_blank" rel="noopener"><span>BIG GEEK Твиттер</span></a></li>
                </ul><br></br>
                <li>Также вы можете связаться с нами по различным вопросам по email:</li><br></br>
                <ul style={{listStyleType: 'square', fontSize: 18 + 'px !important', lineHeight: 2}}>
                    <li><a href="mailto:info@biggeek.ru"><span>info@biggeek.ru</span></a> – по общим вопросам и для получения консультации по ассортименту наших товаров</li>
                    <li><a href="mailto:pr@biggeek.ru"><span>pr@biggeek.ru</span></a> – для блогеров и предложений по сотрудничеству</li>
                    <li><a href="mailto:ad@biggeek.ru"><span>ad@biggeek.ru</span></a> – по вопросам размещения рекламы на наших ресурсах (YouTube, VK, Telegram, Twitter, другие соцсети, блог)</li>
                    <li><a href="mailto:buy@biggeek.ru"><span >buy@biggeek.ru</span></a> – если у вас есть интересные предложения по закупке и продаже товаров</li>
                </ul>
            </ul>
        </div>
    );
};

export default Contacts;