import { Bench, Task } from "tinybench"
import { Identity, Group } from "@semaphore-protocol/core"
import generateProof from "../../browser/proof/generate-proof"
import { generateTable } from "./utils/generate-table"

async function main() {
  const samples = 10

  const bench = new Bench({
    name: "RLN Generate Proof Benchmarks",
    time: 0,
    iterations: samples,
    warmup: false
  })

  const generateMembers = (size: number) => {
    return Array.from(
      { length: size },
      (_, i) => new Identity(i.toString())
    ).map(({ commitment }) => commitment)
  }

  let group: Group

  let member: Identity

  let members: bigint[]

  let merkleTreeDepth: number

  bench
    .add(
      "RLN - Generate Proof 1 Member",
      async () => {
        await generateProof(member, group, 1, 1, 0, 10, undefined, {
          zkey: `../browser/public/rln-zk-artifacts/rln-${merkleTreeDepth}.zkey`,
          wasm: `../browser/public/rln-zk-artifacts/rln-${merkleTreeDepth}.wasm`
        })
      },
      {
        beforeAll: () => {
          group = new Group([])
          member = new Identity()
          group.addMember(member.commitment)
          const leafIndex = group.indexOf(member.commitment)
          const merkleProof = group.generateMerkleProof(leafIndex)
          const merkleProofLength = merkleProof.siblings.length
          merkleTreeDepth = merkleProofLength !== 0 ? merkleProofLength : 1
        }
      }
    )
    .add(
      "RLN - Generate Proof 100 Members",
      async () => {
        await generateProof(member, group, 1, 1, 0, 10, undefined, {
          zkey: `../browser/public/rln-zk-artifacts/rln-${merkleTreeDepth}.zkey`,
          wasm: `../browser/public/rln-zk-artifacts/rln-${merkleTreeDepth}.wasm`
        })
      },
      {
        beforeAll: () => {
          members = generateMembers(100)
          group = new Group(members)
          const index = Math.floor(members.length / 2)
          member = new Identity(index.toString())
          const leafIndex = group.indexOf(member.commitment)
          const merkleProof = group.generateMerkleProof(leafIndex)
          const merkleProofLength = merkleProof.siblings.length
          merkleTreeDepth = merkleProofLength !== 0 ? merkleProofLength : 1
        }
      }
    )
    .add(
      "RLN - Generate Proof 500 Members",
      async () => {
        await generateProof(member, group, 1, 1, 0, 10, undefined, {
          zkey: `../browser/public/rln-zk-artifacts/rln-${merkleTreeDepth}.zkey`,
          wasm: `../browser/public/rln-zk-artifacts/rln-${merkleTreeDepth}.wasm`
        })
      },
      {
        beforeAll: () => {
          members = generateMembers(500)
          group = new Group(members)
          const index = Math.floor(members.length / 2)
          member = new Identity(index.toString())
          const leafIndex = group.indexOf(member.commitment)
          const merkleProof = group.generateMerkleProof(leafIndex)
          const merkleProofLength = merkleProof.siblings.length
          merkleTreeDepth = merkleProofLength !== 0 ? merkleProofLength : 1
        }
      }
    )
    .add(
      "RLN - Generate Proof 1000 Members",
      async () => {
        await generateProof(member, group, 1, 1, 0, 10, undefined, {
          zkey: `../browser/public/rln-zk-artifacts/rln-${merkleTreeDepth}.zkey`,
          wasm: `../browser/public/rln-zk-artifacts/rln-${merkleTreeDepth}.wasm`
        })
      },
      {
        beforeAll: () => {
          members = generateMembers(1000)
          group = new Group(members)
          const index = Math.floor(members.length / 2)
          member = new Identity(index.toString())
          const leafIndex = group.indexOf(member.commitment)
          const merkleProof = group.generateMerkleProof(leafIndex)
          const merkleProofLength = merkleProof.siblings.length
          merkleTreeDepth = merkleProofLength !== 0 ? merkleProofLength : 1
        }
      }
    )
    .add(
      "RLN - Generate Proof 2000 Members",
      async () => {
        await generateProof(member, group, 1, 1, 0, 10, undefined, {
          zkey: `../browser/public/rln-zk-artifacts/rln-${merkleTreeDepth}.zkey`,
          wasm: `../browser/public/rln-zk-artifacts/rln-${merkleTreeDepth}.wasm`
        })
      },
      {
        beforeAll: () => {
          members = generateMembers(2000)
          group = new Group(members)
          const index = Math.floor(members.length / 2)
          member = new Identity(index.toString())
          const leafIndex = group.indexOf(member.commitment)
          const merkleProof = group.generateMerkleProof(leafIndex)
          const merkleProofLength = merkleProof.siblings.length
          merkleTreeDepth = merkleProofLength !== 0 ? merkleProofLength : 1
        }
      }
    )
  // .add(
  //   "RLN - Generate Proof 10000 Members",
  //   async () => {
  //     await generateProof(member, group, 1, 1, 0, 10, undefined, {
  //       zkey: `../browser/public/rln-zk-artifacts/rln-${merkleTreeDepth}.zkey`,
  //       wasm: `../browser/public/rln-zk-artifacts/rln-${merkleTreeDepth}.wasm`
  //     })
  //   },
  //   {
  //     beforeAll: () => {
  //       members = generateMembers(10000)
  //       group = new Group(members)
  //       const index = Math.floor(members.length / 2)
  //       member = new Identity(index.toString())
  //       const leafIndex = group.indexOf(member.commitment)
  //       const merkleProof = group.generateMerkleProof(leafIndex)
  //       const merkleProofLength = merkleProof.siblings.length
  //       merkleTreeDepth = merkleProofLength !== 0 ? merkleProofLength : 1
  //     }
  //   }
  // )

  await bench.run()

  const table = bench.table((task) => generateTable(task))

  console.table(table)

  // console.log(bench.results)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
