const mongoose = require('mongoose');
const Contest = require('../models/Contest');
const Submission = require('../models/Submission');
const Battle = require('../models/Battle');
const User = require('../models/User');
const {stripIndent} = require('common-tags');

mongoose.Promise = global.Promise;

(async () => {
	await mongoose.connect('mongodb://localhost:27017/tsg-ai-arena');

	await Contest.deleteMany({id: 'rotating-drops'});

	await Contest.updateOne(
		{id: 'dragon-puzzles'},
		{
			name: 'Dragon Puzzles',
			id: 'dragon-puzzles',
			start: new Date('1970-01-01T00:00:00.000Z'),
			end: new Date('2038-01-19T12:14:07.000+0900'),
			type: 'score',
			description: {
				ja: stripIndent`
				# ドラゴンのパズル

				* H×Wマスのフィールド上に、1マスにつき1個のドロップが配置されている。
				  * 座標は左上が (1, 1)、右下が (H, W)。
				* ドロップの色は5種類あり、それぞれ1から5までの番号がついている。
				* プレイヤーは「操作Aを1回行ったあと、操作BをM回以下行う」操作セットをN回以下行うことができる。
				  * 操作A: フィールド上のドロップを1つ選択する。 (**注意: マスではない**)
					* 操作B: 操作Aで選択したドロップを、上下左右いずれかに移動する。移動した先のマス上のドロップは、移動元のマスと交換され移動する。
				* フィールドの外にドロップを移動させることはでき内容を。
				* 最終的になるべく同じ色のドロップが隣り合うように並び替えよ。

				## 入力

				\`\`\`
				H W N M
				d11 d12 d13 ...
				d21 d22 d23 ...
				d31 d32 d33 ...
				...
				\`\`\`

				* 1行目に、H, W, N, M が空白区切りで与えられる。
				* y + 1 (1 <= y <= H) 行目に、マス (x, y) 上のドロップの色 dix (1 <= dyx <= 5) が与えられる。
				* フィールド上のドロップの5つの色はすべて同数含まれることが保証される。

				## 出力

				\`\`\`
				x1 x2
				d11 d12 d13 d14 ...
				x2 y2
				d21 d22 d23 d24 ...
				...
				\`\`\`

				* i * 2 - 1 (1 <= i <= N) 行目に、i回目の操作セットの操作Aで選択するドロップが存在するマスの座標 (xi, yi) を空白区切りで出力せよ。
				* i * 2 (1 <= i <= N) 行目に、i回目の操作セットのj回目の操作Bでドロップを移動させる方向dijを空白区切りで出力せよ。
					* 上 (-y方向) に移動: 1
					* 右 (+x方向) に移動: 2
					* 下 (+y方向) に移動: 3
					* 左 (-x方向) に移動: 4

				## スコア

				* **最終的なフィールド上の、同じ色のドロップが隣接する領域全てについての、領域の大きさの二乗平均平方根 (RMS) がスコアとなる。**

				## テストケース

				* H = 5, W = 5, N = 3, M = 5 5ケース
				* H = 10, W = 10, N = 10, M = 10 5ケース
				* H = 20, W = 20, N = 30, M = 15 5ケース

				## サンプルコード

				以下は、この問題に対して不正でない出力を行うC++のサンプルコードである。

				\`\`\`
				#include <bits/stdc++.h>
				using namespace std;

				int **drops;

				int main() {
					cin.tie(0);
					ios::sync_with_stdio(false);

					int H, W, N, M;
					cin >> H >> W >> N >> M;

					drops = (int **)malloc(sizeof(int *) * H);
					for (int y = 0; y < H; y++) {
						drops[y] = (int *)malloc(sizeof(int) * W);
						for (int x = 0; x < W; x++) {
							cin >> drops[y][x];
						}
					}

					for (int i = 0; i < N; i++) {
						cout << 2 << " " << 2 << endl;

						for (int j = 0; j < M; j++) {
							cout << (j % 4) + 1;
							if (j == M - 1) {
								cout << endl;
							} else {
								cout << " ";
							}
						}
					}

					return 0;
				}
				\`\`\`

				## 入力例

				\`\`\`
				5 5 1 3
				1 2 3 4 5
				1 2 3 4 5
				1 2 3 3 4
				1 2 5 4 5
				1 2 3 4 5
				\`\`\`

				## 出力例

				\`\`\`
				3 4
				1 2 2
				\`\`\`
			`,
				en: stripIndent`
			`,
			},
		},
		{upsert: true}
	);

	await Contest.updateOne(
		{id: 'komabasai2018-procon'},
		{
			name: '駒場祭2018 Live Programming Contest',
			id: 'komabasai2018-procon',
			start: new Date('2018-11-24T16:03:00+0900'),
			end: new Date('2018-11-24T17:18:00+0900'),
			type: 'score',
			description: {
				ja: stripIndent`
				# iwashiの収穫祭

				### 問題

				これは何年前か、誰かがちょんぎった1日のお話。

				明日は謎の生物iwashiがつちからはえてきます。iwashiはTSG国にのみ生息する生き物で、天敵はつばめです。その味からTSG国の特産物になってます。

				TSG国のfiord君はiwashiの収穫をしたいと思っています。ただ、iwashiは凶暴な生き物で、群れをなして囲まれてしまうととても危険です。

				今回、TSG国屈指の大企業hakata社が事前にiwashiのはえてくる場所を正確に予測してくれています。

				安全にfiord君がiwashiの収穫を行えるよう、ナビゲートしてあげてください。

				### ルール

				* TSG国はH×Wのマス目で表現されています。北西が(1,1)、南東が(H,W)で表現されます。各マスは「通路」か「壁」のどちらかです。各マスは東西南北の隣接したマスとつながっており、斜めへの移動は出来ません。fiord君やiwashiは通路上を移動し、壁のマスへ行くことは出来ません。
				* この日はTターンからなります。fiord君は各ターン東西南北のどちらかの方向を選び、1マス進めます（進まなくてもいいです）。進んだ先にiwashiがいるなら収穫を試みます。
				* iwashiは毎ターン、fiord君か他のiwashiの群れか、近い方へ向けて毎ターンfiord君と同じ速度で移動します。
				* fiord君が同時に収穫できるiwashiは5匹までです。6匹以上iwashiがいるマスへfiord君が行くと、逆に襲われてケガをしてしまいます。ケガをすると、5ターン治療に費やしてしまうので、気を付けましょう。なお、何故か治療中のfiord君をiwashiは認識できません。
				* Tターンで収穫するiwashiが最大になるようfiord君の行動を教えてあげて下さい。

				#### iwashiの行動について

				具体的には、以下のアルゴリズムで動作します。
				* (1,1)→(1,2)→…→(1,W)→(2,1)→…→(2,W)→(3,1)→…→(H,W)の順に、以下のことを行います。
					1. iwashiがいないなら次へ行きます。
					2. 既にそのマスへ外からiwashiがやってくることが分かっているなら元々そのマスにいたiwashiは動きません。
					3. そうでなければ、他のiwashiのいるマスと治療中でないfiord君をソース（距離0）として「最短距離」のマップを作成。
					4. 北→東→南→西の順に、現在位置よりも3のマップ上で距離が短いマスを探し、見つけたらそちらへ移動します。

				また、各ターンは、
				1. fiord君移動(治療中は動けません)
				2. iwashi移動（運悪くiwashiがfiord君のマスへ突っ込むときがあります。）
				3. iwashiがつちからはえてくる(fiord君がいるマスへはえてくる可能性もあります)
				4. fiord君収穫に挑戦（fiord君がケガをしている間は収穫できません。ケガもしません。iwashiが素通りすることもあります）
					* fiord君が治療中なら収穫出来ません。fiord君のマスにiwashiがいても何も起こりません。
					* fiord君のいるマスに5匹以下のiwashiがいるなら、そのiwashi達を収穫します。
					* fiord君のいるマスに6匹以上のiwashiがいるなら、fiord君は全治5ターンのケガをします。iwashiはつばめが嬉々として狩っていくので消滅します。

				の順になります。

				### 入力

				標準入力を用い、以下の形式で与えられます。

				\`\`\`
				H W T N
				Px Py
				S1
				S2
				...
				SH
				x1 y1 t1
				x2 y2 t2
				...
				xN yN tN
				\`\`\`

				* TSG国の区画はH×Wです。その区画は\{Si | 0≦i≦H-1\}になっています。0≦i≦H-1で|Si|=Wが成立し、Sij="#"でそのマスが壁、Sij="."で通路であることを示します。外周は"#"で囲まれていることが保証されています。
				* 現在のfiord君の位置は(Px, Py)です。周囲が壁て囲まれていて動けない可能性があります。
				* また、この日にfiord君はTターン行動可能です。hakata社のエスパーによると今日はN匹のiwashiがつちからはえてくるらしいです。
				* i匹目(1≦i≦N)のiwashiは位置(xi, yi)に現在からtiターン後につちからはえてきます。ti=0は既にはえているiwashiです。

				### 出力

				\`\`\`
				S
				\`\`\`

				* 標準出力で、fiord君のTターンの移動方法をT文字の文字列Sとして出力してください。
				* Siが"N"、"E"、"W"、"S"のどれかの時、それぞれの方角に応じた方向へfiord君は動こうとします。
				* それ以外の文字だった場合や、|S|>Tの時のSi(i>T)、|S|<Tの時の|S|ターン以降の動作は「移動を試みない」という扱いをします。

				### スコア、テストケース、勝敗の決定方法

				テストケースは以下のものを使用します。
				* 共通のもの
					* H=22
					* W=22
				* tiny(1ケース)
					* N=50
					* T=150
					* 壁と通路の比率: 外周を除いて壁は15%で無作為に生成
				* little(6ケース)
					* N=250
					* T=1000
					* 壁と通路の比率: 外周を除いて壁は25%で無作為に生成
				* much(6ケース)
					* N=3000
					* T=1000
					* 壁と通路の比率: 外周を除いて壁は25%で無作為に生成
				* challenge(3ケース)
					* N=1000
					* T=1000
					* 壁と通路の比率: 外周を除いて壁は47.5%で作為的に生成

				スコアは各テストケースで{iwashiの収穫数}/Nで求めます。勝敗は各テストケースのスコアの総和で求めます。

				今回の五月祭では全体を通して赤vs青の形式を取っています。この大戦では、ceil(100*(勝者のスコアの総和 - 敗者のスコアの総和))ptが勝利したチームに加算されます。

				#### サンプルコード

				以下は、この問題に対して不正でない出力を行う(かつ正の得点を得ると推定される)C++のサンプルコードである。

				[https://gist.github.com/hakatashi/c93259d9e88278d4ad42f86ceb4c98f1](https://gist.github.com/hakatashi/c93259d9e88278d4ad42f86ceb4c98f1)

				### 入力例

				\`\`\`
				10 10 150 50
				2 3
				##########
				#....#...#
				##.#.....#
				#.##.....#
				#........#
				####.....#
				#....##..#
				###......#
				##...##..#
				##########
				5 2 0
				5 7 4
				5 6 17
				7 5 23
				6 8 24
				6 3 24
				9 6 28
				6 8 32
				9 3 34
				3 2 35
				4 8 35
				9 5 43
				9 4 44
				3 5 46
				9 5 54
				5 5 63
				5 9 68
				4 7 71
				7 5 77
				4 8 78
				6 4 78
				8 5 80
				8 7 80
				5 9 82
				8 6 83
				9 6 87
				4 9 92
				9 2 99
				2 2 100
				7 5 102
				9 4 102
				5 7 103
				9 6 103
				8 3 105
				7 5 106
				4 7 106
				8 6 108
				3 2 114
				3 3 117
				5 9 120
				9 9 121
				4 5 123
				8 4 124
				8 8 127
				2 5 129
				3 7 136
				2 7 139
				9 9 139
				7 3 145
				3 7 148
				\`\`\`

				### 出力例

				\`\`\`
				NWWNSEWNSEWSNWWSNWSESESEEWWNNNWSWWENENWSNNWWNNNNEENEWNWWSWWNSNSSNSNNWENESSSSWWSENWSSWEWNESSENWSSEEWNNEENEESSNSNWSENESSWSWNWSENWWSNSNESEWNEENNSWSNSENWS
				\`\`\`
			`,
				en: stripIndent`
			`,
			},
		},
		{upsert: true}
	);

	await Contest.updateOne(
		{id: 'komabasai2018-ai'},
		{
			name: '駒場祭2018 Live AI Contest',
			id: 'komabasai2018-ai',
			start: new Date('2018-11-25T12:03:00+0900'),
			end: new Date('2030-11-25T13:18:00+0900'),
			type: 'battle',
			description: {
				ja: stripIndent`
				# 問題文

				## 背景（プレイヤーは読まなくていい）
				ロボットたちは、盤面上の円を追いかけるのには疲れてしまった。お互いに協力して好きな場所にいくのは確かに難しいし、最初はたのしいと思っていたこともあったんだ。だが、お互いにお互いを踏み台にしてたどり着くその先に何がある？

				文明は進歩する。ある日ロボットは自由に四方に動く能力だけでなく、拡張機能に「ビームを打つガジェット」をいくつか手に入れた。これを装着すると、自分が動き始めるやいなや、自らが進む方向にビームが打てるようになるらしい。

				日々に退屈をしていたロボットたちは、これに喜び早速とあるゲームを考えた。

				## ゲームの概要

				* ゲームは、ターン制かつ攻撃側と防御側が存在する。
				* 各プレイヤーは同じ盤面から始めてそれぞれ攻撃側と防御側を一度ずつ行う。
				* 盤面の外周は壁で囲われているものとする。
				* 初期盤面では、大きさW x Hの盤面の上にはロボットといくつかの壁が配置されている。
				  * ロボットの種類は、Beam, Targetであり、Beamが攻撃側、Targetが防御側に属する。
				* 各ターンごとに、プレイヤーは自分のロボットを選んで、四方の好きな方向を選び動かすことができる。
				  * ロボットは、他のロボットか、壁に衝突するまで止まらずに真っ直ぐ進む。
				  * ただし、Beamのロボットだけは、**移動前に選んだ方向にビームを打ってから**、移動をする。
					* このとき、ビームの先にTargetロボットが存在すればそのロボットは消滅する。
					* またこのビームの軌跡は盤面上に残りTargetロボットはこのBeamを超えることはできない。すなわち、**Targetロボットにとっては、ビームの軌跡も壁になる**。
					* また、ビーム自体は壁を突き破ることはない。
				* このビームによりすべてのTargetロボットが消滅したときに、ゲーム終了となり、攻守交代をして **同じ盤面で** 再び対戦をする。
				* 300ターン後に決着がついていない場合、ゲームが終了する。

				## 勝利条件

				自らが攻撃側の際にゲーム終了までにかかったターン数の合計がより少ないほうが勝ちである。

				## 入出力

				### 入力

				毎ターン自分の手を打つ前の状態が入力として与えられる。

				\`\`\`
				W H
				T
				c11 c12 c13 ... c1W
				c21 c22 c23 ... c2W
				.
				.
				.
				cH1 cH2 cH3 ... cHW
				\`\`\`

				* W(10 <= W <= 30)は盤面の横幅、H(10 <= W <= 30)は盤面の縦幅である。
				* TはAまたはDのが入っており、攻撃側か防御側かをそれぞれA,Dで表す。
				* 以降のc11からcHWは各行スペース区切りでそれぞれcijが地点(i, j)における初期盤面の状態である。以下にそれぞれの表示方法を提示する
				* ロボットの表示は、最初にprefixとして1文字で、ロボットの種類を表す。bがBeam, tがtargetである。その後に続く数字がロボットのID(0<=ID<=30)となる。例えば、BeamのID10のロボットはb10と表現する。
				* また、壁を \`*\` 、ビームが通過したマスを \`x\` で表し、何も無い場合は \`.\` と書く。

				### 出力

				\`\`\`
				r d
				\`\`\`

				* r: robotのID
				* d: 方向。上がu、左がl、下がd、右がrのいずれかの文字。
				* 最後には改行が必要

				### 制約

				* すべてのBeamとTargetは壁以外のマスで連結された領域に存在することが保証される。

				## 入力例

				\`\`\`
				10 10
				A
				. b2 . . . . . * . .
				. . . . * . . * * .
				. . . . * . . . t3 .
				. . * * * . . . . .
				. . * . . . * * . b1
				. * * . * . * * . x
				. b0 . . t4 . . . . x
				. * . . . . . . . x
				* . . . . * . . * *
				. . . * . * . . . .
				\`\`\`

				## 出力例

				\`\`\`
				0 r
				\`\`\`

				## テストケース

				先攻後攻セットを1ケースとして以下のテストケースが存在する。

				* H = 10, W = 10, Beam3つ, Target2つ: 10ケース、スコア40点
				* H = 20, W = 20, Beam10つ, Target3つ: 3ケース、スコア100点
				* H = 30, W = 30, Beam20つ, Target5つ: 1ケース、スコア200点

				## 勝利判定

				1つのセットにおいて、より短いターン数ですべてのTargetを消滅させたプレイヤーは、上述のケースごとの得点を得る。

				ゲーム終了までのターン数が同じ場合は引き分けとなり、得点は得られない。

				すべてのテストケースの合計点が高いほうが勝利となる。

				## 初期実装

				* 各ターンランダムに自分のロボットを選び、ランダムな方向に移動するような初期実装を既に用意している。これをベースに用いても良い
					* [https://gist.github.com/moratorium08/2aa569af96f2b50156893bb09a45a0d7](https://gist.github.com/moratorium08/2aa569af96f2b50156893bb09a45a0d7)

			`,
				en: stripIndent`
			`,
			},
		},
		{upsert: true}
	);

	const contestAi = await Contest.findOne({id: 'komabasai2018-ai'});

	for (const presetName of ['random', 'cat']) {
		await Submission.updateOne({
			name: presetName,
			contest: contestAi,
		}, {
			isPreset: true,
			name: presetName,
			user: null,
			contest: contestAi,
			language: null,
			code: null,
			size: null,
		}, {upsert: true});
	}

	const kuromunori = await User.findOne({email: 'kuromunori@twitter.com'});
	kuromunori.admin = false;
	await kuromunori.save();

	const moratorium = await User.findOne({email: 'moratorium08@twitter.com'});
	moratorium.admin = true;
	await moratorium.save();

	mongoose.connection.close();
})();
