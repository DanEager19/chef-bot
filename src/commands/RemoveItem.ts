import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import dotenv from 'dotenv';
dotenv.config()
const axios = require('axios')

export const RemoveItem = {
    data: new SlashCommandBuilder()
        .setName('removeitem')
        .setDescription('Remove an item from inventory.')
        .addIntegerOption((option) => option.setName('id').setDescription('Enter item ID.')),
    async execute(interaction: CommandInteraction) {
        const member = interaction.guild?.members.cache
            .find((member: { id: string; }) => member.id === interaction.user.id);

        const officerRole = member?.roles.cache.get('785951435829149827');
        const adminRole = member?.roles.cache.get('785964719914614814');

        if(typeof(adminRole) === 'undefined' && typeof(officerRole) === 'undefined') {
            const content = 'Sorry! You don\'t have access to this command!';
            console.log(`[x] - ${interaction.user.tag} tried to use the removeitem command.`);
            await interaction.reply({
                content,
                ephemeral: true
            });
        } else {
            axios.delete(`http://${process.env.EXPRESS_SERVER}/items`, {
                    data: { id: interaction.options.getInteger('id') }
                })
                .then(async(res: any) => {
                    const content = res.data;
                    console.log(`[-] - ${interaction.user.tag} deleted an item.`)
                    await interaction.reply({
                        content
                    });
                })
                .catch(async (e: any) => {
                    let content: any;
                    e.response ? content = e.response.data : content = e.toString();
                    console.log(`[x] - ${content}`);
                    await interaction.reply({
                        content
                    });
                });
        }
    }
}