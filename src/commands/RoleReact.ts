import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export const RoleReact = {
	data: new SlashCommandBuilder()
        .setName('rolereact')
        .setDescription('Allows for member role reactions'),
	async execute(interaction: CommandInteraction) {
        if (interaction.user.bot) return;
        const member = interaction.guild?.members.cache
            .find((member: { id: string; }) => member.id === interaction.user.id);

        const officerRole = member?.roles.cache.get('785951435829149827');
        const adminRole = member?.roles.cache.get('785964719914614814');

        if(typeof(adminRole) === 'undefined' && typeof(officerRole) === 'undefined') {
            const content = 'Sorry! You don\'t have access to this command!';
            console.log(`[x] - ${interaction.user.tag} tried to use the rolereact command.`);
            await interaction.reply({
                content,
                ephemeral: true
            });
        } else {
            const content = 'Done!';
            await interaction.reply({content, ephemeral: true})

            const text = '**React with an emoji for the corresponding role!**\n\nš½: `Cooks`\n\nš±: `Gardeners`\n\nš»: `Social`\n\nā¢: `Offtopic`'
            const message = await interaction.channel?.send(text);

            message?.react('š½')
                .then(() => { message.react('š±') })
                .then(() => { message.react('š»') })
                .then(() => { message.react('ā¢') });

            const filter = (reaction: any, user: any) => {
                const reactEmoji = reaction.emoji.name;
                return ('š½' === reactEmoji|| 'š±'=== reactEmoji || 'š»'=== reactEmoji || 'ā¢' === reactEmoji) && user.id === interaction.user.id;
            }

            const collector = message?.createReactionCollector({ filter });

            collector?.on('collect', async(reaction:any, user:any) => {
                const { guild } = reaction.message 
                const member = guild.members.cache.find((member: { id: string; }) => member.id === user.id);
                if (reaction.emoji.name === 'š½') {
                    const role = reaction.message.guild.roles.cache.find((r: { id: string; }) => r.id === '785959812475256832');
                    member.roles.add(role);
                    console.log(`[+] - Gave ${user.tag} the ${role} role`);
                } else if (reaction.emoji.name === 'š±') {
                    const role = reaction.message.guild.roles.cache.find((r: { id: string; }) => r.id === '785959816676900884');
                    member.roles.add(role);
                    console.log(`[+] - Gave ${user.tag} the ${role} role`);
                } else if (reaction.emoji.name === 'š»') {
                    const role = reaction.message.guild.roles.cache.find((r: { id: string; }) => r.id === '999077403299172463');
                    member.roles.add(role);
                    console.log(`[+] - Gave ${user.tag} the ${role} role`);
                } else if (reaction.emoji.name === 'ā¢') {
                    const role = reaction.message.guild.roles.cache.find((r: { id: string; }) => r.id === '796871266329165824');
                    member.roles.add(role);
                    console.log(`[+] - Gave ${user.tag} the ${role} role`);
                }
            });
            
            collector?.on('end', () => {
                console.log(`Collection of role reactions has ended.`);
            });
        }
    },
};