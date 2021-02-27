use byteorder::{ByteOrder, LittleEndian};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    info,
    program_error::ProgramError,
    pubkey::Pubkey,
};
use std::mem;

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
fn process_instruction(
    program_id: &Pubkey, 
    accounts: &[AccountInfo], 
    _instruction_data: &[u8]
) -> ProgramResult {


    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> EXAMPLES: HELLO DEV  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    // Iterating accounts is safer then indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
        info!("Greeted account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    // The data must be large enough to hold a u64 count
    if account.try_data_len()? < mem::size_of::<u32>() {
        info!("Greeted account data length too small for u32");
        return Err(ProgramError::InvalidAccountData);
    }

    // Increment and store the number of times the account has been greeted
    let mut data = account.try_borrow_mut_data()?;
    let mut num_greets = LittleEndian::read_u32(&data);
    num_greets += 1;
    LittleEndian::write_u32(&mut data[0..], num_greets);

    info!("Hello Dev! You're looking well today.");
    


    Ok(())
}
