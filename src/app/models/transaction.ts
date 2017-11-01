export interface Transaction {
	id: string,
	description: string,
	category: string,
  toAccount: string,
  fromAccount?: string,
	amount: number,
  type: string,
	timestamp: any
}
