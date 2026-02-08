use binary_merkle_root::binary_merkle_root;
use ec::bjj::BabyJubJubParams;
use ec::Curve;
use ec::CurveTrait;
use ec::scalar_field::ScalarField;
use std::field::bn254::assert_lt;
use std::hash::poseidon::bn254::hash_1 as poseidon1;
use std::hash::poseidon::bn254::hash_2 as poseidon2;
use std::hash::poseidon::bn254::hash_3 as poseidon3;

// Maximum depth of the Merkle Tree.
pub global MAX_DEPTH: u32 = 10;

// Generator point of Baby Jubjub curve.
// ref: https://github.com/noir-lang/noir-edwards/blob/main/src/test.nr#L6C8-L6C13
global BASE8: [Field; 2] = [
    5299619240641551281634865583518297030282874472190772894086521144482721001553,
    16950150798460657717958625567821834550301663161624707787222815936182638968203,
];

// This is a 251 bit value.
global L: Field = 2736030358979909402780800718157159386076813972158567259200215660948447373041;

fn main(
    secret: Field,
    user_message_limit: Field,
    message_id: Field,
    merkle_proof_length: u32,
    merkle_proof_indices: [u1; MAX_DEPTH],
    merkle_proof_siblings: [Field; MAX_DEPTH],
    x: pub Field,
    scope: pub Field,
) -> pub (Field, Field, Field) {
    // Ensure secret_key < l.
    assert_lt(secret, L);

    // Identity generation.
    let generator: Curve<BabyJubJubParams> = Curve { x: BASE8[0], y: BASE8[1] };
    let secret_scalar: ScalarField<63> = ScalarField::from(secret);
    let public_key = generator.mul(secret_scalar);

    let identity_commitment = poseidon2([public_key.x, public_key.y]);

    let rate_commitment = poseidon2([identity_commitment, user_message_limit]);

    // Calculate Merkle root.
    let merkle_root = binary_merkle_root(
        poseidon2,
        rate_commitment,
        merkle_proof_length,
        merkle_proof_indices,
        merkle_proof_siblings,
    );

    // message_id range check
    // Check 0 <= message_id < user_message_limit
    assert(message_id as u32 >= 0 & message_id as u32 < user_message_limit as u32);

    // SSS share calculations
    let a1 = poseidon3([secret, scope, message_id]);
    let y = a1 * x + secret;

    // Nullifier generation.
    let nullifier = poseidon1([a1]);

    // Output the share, the root and nullifier.
    (y, merkle_root, nullifier)
}

#[test]
fn test_generate_y_root_and_nullifier() {
    let secret = 1108309587400101993411102416244214863407236426086075003887302581916280632942;
    let user_message_limit = 3;
    let message_id = 1;
    let merkle_proof_length = 3;
    let merkle_proof_indices = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let merkle_proof_siblings = [
        1,
        17197790661637433027297685226742709599380837544520340689137581733613433332983,
        756592041685769348226045093946546956867261766023639881791475046640232555043,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ];
    let x = 43;
    let scope = 32;

    let result = main(
        secret,
        user_message_limit,
        message_id,
        merkle_proof_length,
        merkle_proof_indices,
        merkle_proof_siblings,
        x,
        scope,
    );

    let y = 12356619821810267986120622666785209285739122412569198725630324999782018871706;

    let merkle_root = 17736010522294375663307090433221275727020267308874050802044216648097163850037;

    let nullifier = 13869151267035736519231303184089643059570149775620938672447437357619974636612;

    assert(result.0 == y);

    assert(result.1 == merkle_root);

    assert(result.2 == nullifier);
}
