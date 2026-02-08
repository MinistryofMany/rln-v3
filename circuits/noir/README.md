# RLN V3

This project contains the RLN V3 implementation in Noir. 

## Install Dependencies

```sh
yarn
```

## Compile Circuit

```sh
yarn compile
```

## Generate Prover

```sh
yarn generate:prover
```

## Generate Witness

```sh
yarn generate:witness
```

## Prove and Verify

```sh
yarn prove:verify
```

## Test

```sh
yarn test
```

## Code Formatting

Run [Prettier](https://prettier.io/) and `Nargo fmt` to check formatting rules:

```bash
yarn check
```

Or to automatically format the code:

```bash
yarn format
```

## References

- [Noir docs](https://noir-lang.org/)
- [RLN V2 Noir circuits](https://github.com/Rate-Limiting-Nullifier/noir-rln/blob/main/src/main.nr)
- [RLN V3 Circom circuits](https://github.com/vplasencia/rln)
- [Semaphore Noir implementation by HashCloak](https://github.com/hashcloak/semaphore-noir)