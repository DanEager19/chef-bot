export = {
	name: 'messageReactionRemove',
	execute(interaction:any) {
		console.log(`[~] - ${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};