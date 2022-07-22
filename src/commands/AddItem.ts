import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction  } from "discord.js";
import dotenv from 'dotenv';
dotenv.config()
const axios = require('axios')


export const AddItem =  {
    data: new SlashCommandBuilder()
        .setName('additem')
        .setDescription('Add an item into inventory.')
        .addStringOption((option) => option.setName('name').setDescription('Enter item name.'))
        .addStringOption((option) => option.setName('description').setDescription('Enter item description.'))
        .addIntegerOption((option) => option.setName('inventory').setDescription('Enter item inventory.')),
    async execute(interaction: CommandInteraction) {
        axios.post(`http://${process.env.EXPRESS_SERVER}/items`, {
                name: interaction.options.getString('name'),
                description: interaction.options.getString('description'),
                inventory: interaction.options.getInteger('inventory')
            })
            .then(async(res: any) => {
                console.log(`[+] - ${interaction.user.tag} created a new item.`)
                const content = res.data;
                await interaction.reply({
                    content
                });
            })
            .catch(async (e: any) => {
                let content: any;
                e.response.data ? content = e.response.data : content = e;
                console.log(`[x] - ${content}`);
                await interaction.reply({
                    content
                });
            });
    }
}