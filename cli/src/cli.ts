import { Command } from "commander";
import { runSuggestCommand } from "./commands/suggest.js";

const program = new Command();

program
    .name("edd-cli")
    .description("福岡おでかけ提案ボットCLI")
    .version("0.1.0");


program
    .command("suggest")
    .description("Suggest a plan for Fukuoka outing")
    .option('--mood <mood>', '気分を指定(relax|active|hungry|scenic|culture)', 'relax')
    .option('--area <area>', 'エリアを指定(hakata|tenjin|ohori|dazaifu|yufuin)', 'hakata')
    .option('--budget <budget>', '予算を指定(low|medium|high)', 'medium')
    .option('--duration <duration>', '所要時間を指定(short|medium|long)', 'medium')
    .action(runSuggestCommand);

program.parse(process.argv);
