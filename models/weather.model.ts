export class Weather {
  public city: string
  public temperature: number
  public condition: string

  constructor(city: string, temperature: number, condition: string) {
    this.city = city
    this.temperature = temperature
    this.condition = condition
  }
}
