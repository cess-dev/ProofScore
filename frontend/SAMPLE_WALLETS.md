# Sample Wallet Addresses for Testing

These are sample Ethereum wallet addresses you can use to test the ProofScore dashboard. Each address will generate consistent dummy data.

## High Reputation Wallets (75+ / 100 - "Excellent")

```
0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
0x1234567890123456789012345678901234567890
```

## Good Reputation Wallets (60-74 / 100 - "Trustworthy")

```
0xabcdefabcdefabcdefabcdefabcdefabcdefabcd
0x1111111111111111111111111111111111111111
0x5555555555555555555555555555555555555555
```

## Moderate Reputation Wallets (45-59 / 100 - "Good")

```
0x2222222222222222222222222222222222222222
0x3333333333333333333333333333333333333333
```

## Lower Reputation Wallets (30-44 / 100 - "Fair")

```
0x0000000000000000000000000000000000000000
0x4444444444444444444444444444444444444444
```

## Wallets with Risk Factors

Some addresses will randomly show risk factors. Try these multiple times or use addresses ending in certain characters to trigger risk detection:

```
0x1111111111111111111111111111111111111111
0x2222222222222222222222222222222222222222
0x3333333333333333333333333333333333333333
```

## ENS Names (also supported)

```
vitalik.eth
ethereum.eth
test.eth
demo.eth
```

## Notes

- Any valid Ethereum address format (42 characters starting with `0x`) will work
- Each address generates consistent data based on its hash
- Scores range from approximately 60-95 out of 100 (normalized from 0-1000 scale)
- Risk factors appear when the address hash modulo 3 equals 0
- The system accepts both regular addresses and ENS names (ending in `.eth`)
