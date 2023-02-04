import { Response } from "express";
import { Participation } from "../models/participation.model";
import { VerifiedRequest } from "../utils/checkToken";

export const updateParticipation = async (req: VerifiedRequest, res: Response) => {

    try {
        const { lastChecked } = req.body;
        const participationId = req.params.id;

        if (lastChecked === null) {
            return res.status(400).json({ message: 'Participation cannot be updated' })
        }

        const participation = await Participation.findByPk(participationId);

        if (!(participation instanceof Participation)) {
            return res.status(400).json({ message: 'Participation cannot be found' })
        }

        participation.lastChecked = new Date(lastChecked);
        await participation.save();

        return res.status(200).json(participation);

    } catch (err) {
        console.log(err);
    }



}