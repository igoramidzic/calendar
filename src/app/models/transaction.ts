export interface Transaction {
	id: string,
	description: string,
	category: string,
	account: string,
	amount: number,
  type: string,
	timestamp: any
}
