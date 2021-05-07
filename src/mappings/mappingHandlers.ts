import { SubstrateEvent } from "@subql/types";
import { Address } from "../types/models/Address";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: { data: [ accountId] }} = event;
    logger.info(accountId.toString());
    //Retrieve the record by its ID
    const record = new Address(accountId.toString());
    record.address = accountId.toString();
    record.creationBlock = event.block.block.header.number.toBigInt();
    record.creationTime = event.block.timestamp;
    await record.save();
}
