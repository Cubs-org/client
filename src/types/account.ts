type Status = 'active' | 'inactive' | 'pending'
type AccountType = 'free' | 'plus' | 'business' | 'enterprise'
type PlanType = 'perMonth' | 'perYear' | 'perThreeYears'
type PaymentType = 'creditCard' | 'debitCard' | 'bankSlip'

interface IAccount {
    status: Status
    accountType: AccountType
    planType: PlanType
    paymentType: PaymentType
}
