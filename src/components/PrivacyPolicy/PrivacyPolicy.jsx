import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto px-10 py-10">
            <h1 className="text-5xl text-left font-bold mb-10 mt-10 text-gray-500">Политика конфиденциальности</h1>
            <h2 className="text-1xl text-left font-semibold mb-4">Политика в отношении обработки персональных данных АО "ИШТАР", ИНН 9703156047, ОГРН 1237700629396</h2>
            <p className="mb-4 text-left text-base">Пожалуйста, внимательно ознакомьтесь с Политикой, которая регулирует процесс обработки и защиты персональных данных.</p>

            <h3 className="text-xl text-left font-semibold mt-6 mb-2">1. Термины и определения</h3>
            <p className="mb-2">1.1. В Политике защиты и обработки персональных данных АО "ИШТАР" (далее – Политика) используются следующие основные термины и определения:</p>

            <ul className="list-disc pl-5 mb-4 text-justify">
                <li><strong>Автоматизированная обработка персональных данных</strong> – обработка персональных данных с помощью средств вычислительной техники;</li>
                <li><strong>Блокирование персональных данных</strong> – временное прекращение обработки персональных данных, за исключением случаев, если обработка необходима для уточнения персональных данных;</li>
                <li><strong>Информационная система персональных данных</strong> – совокупность содержащихся в базах данных персональных данных и обеспечивающих их обработку информационных технологий и технических средств;</li>
                <li><strong>IP-адрес</strong> – уникальный сетевой адрес узла в компьютерной сети, построенной по протоколу IP;</li>
                <li><strong>Конфиденциальность персональных данных</strong> – обязательное для соблюдения Оператором требование не допускать их распространения без согласия субъекта персональных данных или наличия иного законного основания;</li>
                <li><strong>Cookies</strong> – небольшой фрагмент данных, отправленный веб-серверами, хранимый на компьютере пользователя, который веб-клиент или веб-браузер каждый раз пересылает веб-серверу в HTTP-запросе;</li>
                <li><strong>Обезличивание персональных данных</strong> – действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному субъекту;</li>
                <li><strong>Обработка персональных данных</strong> – любое действие с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу, обезличивание, блокирование, удаление, уничтожение;</li>
                <li><strong>Оператор</strong> – организация, самостоятельно или совместно с другими лицами организующая обработку персональных данных;</li>
                <li><strong>Персональные данные</strong> – любая информация, относящаяся к определенному или определяемому физическому лицу;</li>
                <li><strong>Персональные данные, сделанные общедоступными</strong> – персональные данные, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных;</li>
                <li><strong>Предоставление персональных данных</strong> – действия, направленные на раскрытие персональных данных определенному лицу или кругу лиц;</li>
                <li><strong>Пользователь</strong> – лицо, имеющее доступ к сайту, сервисам, программам, товарам или услугам Оператора;</li>
                <li><strong>Распространение персональных данных</strong> – действия, направленные на раскрытие персональных данных неопределенному кругу лиц;</li>
                <li><strong>Сайт</strong> – совокупность информации, текстов, изображений, графических элементов и иных результатов интеллектуальной деятельности, доступных в сети Интернет;</li>
                <li><strong>Трансграничная передача персональных данных</strong> – передача персональных данных на территорию иностранного государства;</li>
                <li><strong>Уничтожение персональных данных</strong> – действия, в результате которых невозможно восстановить содержание персональных данных в информационной системе и уничтожаются материальные носители персональных данных;</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">2. Общие положения</h3>
            <p className="mb-2 text-justify">2.1. Политика разработана в соответствии с Конституцией Российской Федерации, Гражданским кодексом Российской Федерации, Федеральным законом «О персональных данных» № 152-ФЗ от 27.07.2006 и иными нормативными правовыми актами Российской Федерации в области защиты и обработки персональных данных и действует в отношении всех персональных данных, которые Оператор может получить от Пользователей Сервиса.</p>
            <p className="mb-2 text-justify">2.2. Правовым основанием обработки персональных данных является совокупность нормативных правовых актов, во исполнение которых и в соответствии с которыми Оператор осуществляет обработку персональных данных, в том числе:</p>
            <ul className="list-disc pl-5 mb-4">
                <li>Конституция Российской Федерации;</li>
                <li>Гражданский кодекс Российской Федерации;</li>
                <li>иные нормативные правовые акты, регулирующие отношения, связанные с деятельностью Оператора;</li>
                <li>договоры, заключаемые между Оператором и субъектами персональных данных;</li>
                <li>согласие субъектов персональных данных на обработку их персональных данных.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">3. Цели сбора и обработки персональных данных</h3>
            <p className="mb-2 text-justify">3.1. Оператор осуществляет обработку персональных данных в следующих целях:</p>
            <ul className="list-disc pl-5 mb-4">
                <li>Предоставление Пользователю доступа к функционалу Сервиса;</li>
                <li>Улучшение качества Сервиса, его персонализация;</li>
                <li>Информирование о новостях, акциях и предложениях, связанных с Сервисом;</li>
                <li>Осуществление обратной связи с Пользователем;</li>
                <li>Анализ использования Сервиса и повышение его функциональности.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">4. Обработка и хранение персональных данных</h3>
            <p className="mb-2 text-justify">4.1. Оператор обрабатывает и хранит персональные данные в информационных системах на территории Российской Федерации. Персональные данные хранятся до тех пор, пока это необходимо для выполнения целей обработки, установленных Политикой.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">5. Права субъектов персональных данных</h3>
            <p className="mb-2 text-justify">5.1. Субъекты персональных данных имеют право на:</p>
            <ul className="list-disc pl-5 mb-4">
                <li>Получение информации о своих персональных данных, которые обрабатываются Оператором;</li>
                <li>Исправление неточных или устаревших данных;</li>
                <li>Удаление или блокировку своих персональных данных, если обработка осуществляется с нарушением закона;</li>
                <li>Отзыв согласия на обработку персональных данных;</li>
                <li>Обращение в суд за защитой своих прав.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">6. Защита персональных данных</h3>
            <p className="mb-2 text-justify">6.1. Оператор принимает необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, уничтожения, модификации, блокировки и распространения.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">7. Изменения в Политике</h3>
            <p className="mb-2 text-justify">7.1. Оператор вправе вносить изменения в настоящую Политику. Изменения вступают в силу с момента их публикации на Сайте, если иное не предусмотрено условиями.</p>
            <p className="mb-2 text-justify">7.2. Пользователь обязуется периодически проверять Политику на предмет внесенных изменений.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-left">8. Контактная информация</h3>
            <p className="mb-2 text-justify">8.1. Все предложения или вопросы по настоящей Политике направляйте на электронную почту: <a href="mailto:info@example.com" className="text-blue-600 hover:underline">info@example.com</a></p>

            <p className="mt-6 text-gray-600 text-sm text-justify">Дата последнего обновления: 07.09.2024</p>
        </div>
    );
};

export default PrivacyPolicy;
