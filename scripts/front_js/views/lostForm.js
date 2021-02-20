const display = () => {
  return `<div class="container" style="max-width: 550px;">
    <form action="/" method="POST">
      <fieldset>
        <legend>Загубили своє щастя?</legend>
        <h5>Що за тваринка?</h5>
        <div class="form-group">
          <select id="animalType-lost" class="custom-select">
            <option value="Змійка">Змійка</option>
            <option value="Пташка">Пташка</option>
            <option value="Рибка">Рибка</option>
            <option value="Земноводне">Земноводне</option>
            <option value="Гризун">Гризун</option>
            <option value="Котик">Котик</option>
            <option value="Собачка">Собачка</option>
            <option value="Павучок">Павучок</option>
            <option value="Інше">Інше</option>
          </select>
        </div>
        <h5>Якого віку, улюбленець?</h5>
        <div class="form-group">
          <select id="age-lost" class="custom-select">
            <option value="Молода">Молода</option>
            <option value="Зрілого віку">Зрілого віку</option>
            <option value="Старенька">Старенька</option>
          </select>
        </div>
        <h5>Оберіть колір, що найбільше підходить тварині</h5>
        <div class="form-group">
          <select id="color-lost" class="custom-select">
            <option selected="" value="Руда">Рудий</option>
            <option value="Чорно біла">Чорно біла</option>
            <option value="Чорний">Чорний</option>
            <option value="Зелений">Зелений</option>
            <option value="Темно зелений">Темно зелений</option>
            <option value="Зелений та синій">Зелений та синій</option>
            <option value="Рожевий">Рожевий</option>
            <option value="Чорний та зелений">Чорний та зелений</option>
            <option value="Бура">Бурий</option>
            <option value="Сірий">Сірий</option>
          </select>
        </div>
        <div class="form-group">
          <h5>Прикріпіть будь ласка фото тварини</h5>
          <input type="file" accept=".jpg, .jpeg, .png" class="form-control-file" id="img-lost" aria-describedby="fileHelp" required>
          <small id="fileHelp" class="form-text text-muted">Без фото улюбленця, господар не зможе його опізнати.</small>
        </div>
        <div class="form-group">
          <h5>Опишіть тваринку</h5>
          <textarea class="form-control" id="disc-lost" rows="3" placeholder="Можете зазначити кличку, особливі прикмети тварини чи місце де ви могли загубити її." ></textarea>
          <small id="descHelp" class="form-text text-muted">Даний пункт не є обов'язковим, але значно підвищує шанс того, що на вашу картку відгукнуться=)</small>
        </div>
        <div class="form-group">
          <h5>Введіть ваш email</h5>
          <input type="email" class="form-control" id="email-lost" aria-describedby="emailHelp" placeholder="vasyaPupkin@gmail.com" required>
          <small id="emailHelp" class="form-text text-muted">Даний email зможуть побачити інші користувачі!</small>
        </div>
        <div class="form-group">
          <h5>Введіть ваш номер телефону</h5>
          <input class="form-control" placeholder="066 123 4567" id="phone-lost" type="tel" name="phone"
          pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
          required>
          <small  class="form-text text-muted">Приклад - 077 333 4444</small>
          <small  class="form-text text-muted">Даний номер телефону зможуть побачити інші користувачі!</small>
        </div>
      </fieldset>
      <div id="g-recaptcha-box">
        <div class="g-recaptcha" data-sitekey="6LfER2AaAAAAAAZC3D1nW1ViH6m3JBgY0Y8Z228e"></div>
      </div>
      <button type="button" id="lost-submit" class="btn btn-primary">Надіслати</button>
    </form>
    </div>
    `;
}

export default display;
