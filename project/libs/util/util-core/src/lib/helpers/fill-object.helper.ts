import { ClassConstructor, plainToInstance } from 'class-transformer';

/**
 * Для преобразования простого объекта `plainObject` в экземпляр класса `someDto`
 * @param someDto Класс, который нужно наполнить совйствами из `plainObject`
 * @param plainObject Объект со свойствами для класса `someDto`
 * @return Вернёт экземпляр указанного класса, заполненным данными из объекта `plainObject`
 */
export function fillObject<Class, Object>(someDto: ClassConstructor<Class>, plainObject: Object) {
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true})
}
