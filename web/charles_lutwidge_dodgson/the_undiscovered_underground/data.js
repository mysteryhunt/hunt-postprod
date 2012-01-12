START_NODE = '1';
NODES = {
    '1': {
        'text': '"It is with great hope and expectation that I send you on this mission," the Grand Inquisitor intones, his voice booming like distant, rumbling thunderheads. "We have discovered what appears to be a piece of the Great Underground Empire, never before explored. I would have sent Grubald the Bold, but he\'s busy. As is Matchlick the Mighty. So, \'tis you."\nYou are at the start of the adventure. To the northeast, through a portal, there is a gentle, twisting descent into the darkness down a path with steps. At the bottom you pass through a portal.',
        'd': '2'
    },
    '2': {
        'text': 'You stand in a maze of twisty little passages, all alike. This maze is extremely confusing. You try to orient yourself by looking for key details. A tall stalagmite stands before you; it would take several people to reach around it.\nTo the north, next to an impassable barrier, steps lead upwards, back to the surface.\nFar to the south, there appears to be a shimmering barrier.\nTo the east, you could follow a twisty little passage.\nTo the west, a path gently slopes upwards.',
        'e': '3',
        's': '4',
        'u': '1',
        'w': '51'
    },
    '3': {
        'text': 'The path ends abruptly in front of two magical sliding doors, leading to a small closed room that appears to be enchanted. You do not trust magic, and leave these artefacts well alone. From here, the path leads back to the west.',
        'w': '2'
    },
    '4': {
        'text': 'You stand in a maze of twisty little passages, all alike. The floor appears pitted in three places as if some creatures live below.\nTo the east is a portal, beyond which the path crosses a windy pass before another portal.\nThe shimmering barrier to the south looks forbidding, and it appears to be impassable.\nFrom this point, you may go north, or east through the windy pass.\n\n- There appear to be several flasks of mulled wine strewn about. \n- You see three gold pieces in the dust. Making sure no one is watching, you slip them into your purse.',
        'e': '5',
        'n': '2'
    },
    '5': {
        'text': 'You stand in a maze of twisty little passages, all alike. There is an impassable shimmering barrier to the south, which you ignore. There are also steps leading upwards to the surface, but you stand resolute in your determination to complete your quest before you leave. To the east are nests of carrier pigeons ready to take flight. No doubt messages of great import are being sent. You hope they do not involve you.\nFrom here, you may travel east, or west through a windy pass.\n\n- Flasks of water tempt your thirst.',
        'e': '6',
        'w': '4'
    },
    '6': {
        'text': 'From here, you may travel along passages to the north, east, or west.  A passage upwards does not tempt you.\n\n- A few steps away to the north, you spot a flagon of ale.\n- You can rest here.\n- You search nearby and discover twenty-three copper pieces.',
        'e': '7',
        'n': '46',
        'w': '5'
    },
    '7': {
        'text': 'You catch a glimpse of a strange creature running around wildly. It looks at you and mutters, "We hates it, we hates it, we hates it forever!!" It quickly scurries out of sight. You notice a short path to the north that leads to a dead end, which you explore, but find nothing.\nFrom here, the path leads east and west.',
        'e': '8',
        'w': '6'
    },
    '8': {
        'text': 'To the south, steps lead upwards to the surface.  To the north, can it be a glimpse of the outside world? Is this a hastily abandoned camp of some previous adventurer who did not have the will to finish the quest? \nYou suppress the temptation to return to the surface, and ignore both paths.  Two corridors lead to the east and west.\n\n- Some abandoned rations and tasty beverages are to the north.\n- It feels safe to rest here.',
        'e': '9',
        'w': '7'
    },
    '9': {
        'text': 'You stand in a maze of twisty little passages, all alike.\nFrom here, there are paths to the east, south and west. In addition, there are steps upwards to the south, leading west, but your will is strong and you ignore them.\n\n- An ethereal blue orb lights the room.\n- You spot five copper pieces, which you pocket.',
        'e': '10',
        's': '45',
        'w': '8'
    },
    '10': {
        'text': 'Can this be? It must be an evil illusion to trap unsuspecting adventurers! To both the north and south, you see mirages that suggest you might be above ground... What lunacy! This must be a spell to lure people to their doom, like the siren song. You laugh, "Such foolish tricks will not work on me!" and avoid either the north or the south.\nYou may travel east or west, back into the gloom.',
        'e': '11',
        'w': '9'
    },
    '11': {
        'text': 'You blink and rub your eyes, tired of the gloom. There are paths to the west, north, and south. Tempting as they are, you ignore the steps leading upwards to the east.\n\n- A small comfort: you find and pocket six copper pieces.',
        'n': '12',
        's': '37',
        'w': '10'
    },
    '12': {
        'text': 'You stand at the top of a path that slopes gently downwards to the north, then veers east for a few paces. To the east, a steeper, bumpier path quickly veers north.  Another passage leads south.\n\n- Your eagle eyes spot four gold pieces in a wooden box.',
        'e': '13',
        'n': '23',
        's': '11'
    },
    '13': {
        'text': 'You stand in a maze of twisty little passages, all alike.\nYou are in a busy intersection. A small set of steps to the south veers west, a large passage leads east, and a smaller passage leads north.\nYou see three vertical shafts that may either lead upwards to the surface, or even deeper below. You decide that this level is best for you right now, and do not consider using them.\n\n- As you try to make sense of the options before you, your eyes fall on a small stack of four gold pieces in a wooden box. It feels like you have seen this before. Deja vu?',
        'e': '14',
        'n': '23',
        's': '12'
    },
    '14': {
        'text': 'Two vertical shafts lead to the surface, but you again resist the siren call of the outside world. Your attention shifts to short path that ends to the north. You decide it would not be worth your time to putter around there either. Paths lead east or west. Something tells you that the door to the south is a Really Bad Idea.\n\n- Yet another mysterious blue light illuminates the cavern.\n- Out of the corner of your eye, you spot something glittering. Eight platinum pieces! Score!',
        'e': '15',
        'w': '13'
    },
    '15': {
        'text': 'The passage continues to the east and west.\n\n- You can rest here.',
        'e': '16',
        'w': '14'
    },
    '16': {
        'text': 'You notice a store catering to alchemists and necromancers, but there is no one there to serve you right now.\nYour attention turns to the portal to the south. You can not put your finger on it, but it does not seem welcoming. You decide to trust your instincts and not go in that direction. That leaves you with going either east or west.\n\n- The calming warmth of an azure blue light illuminates this dark corner. \n- It looks like someone has been careless and you find a small fortune of a whole two copper pieces.',
        'e': '17',
        'w': '15'
    },
    '17': {
        'text': 'You stand in a maze of twisty little passages, all alike.\nThe passage slopes slightly upwards to the west. Other paths lead north and south. To the south you smell roast boar.',
        'n': '18',
        's': '19',
        'w': '16'
    },
    '18': {
        'text': 'This short path ends abruptly. Another dead end. Enormous doors might conceal a frightening secret; you dare not investigate.',
        's': '17'
    },
    '19': {
        'text': 'You see another attempt to tempt you to leave the caverns to the outside world: two vertical shafts, and a flight of steps leading upwards. But your will is strong. Carrier pigeons nest here.\nYou ponder your next move. Paths lead north and east.?\n\n- Hidden in a corner you find a place to rest.\n- There is a stash of roast boar and ale here, ripe for the taking.',
        'e': '20',
        'n': '17'
    },
    '20': {
        'text': 'The passage slopes gently downwards towards the northeast. The walls leading down are lit by four circular lamps. Another path leads west.\n\n- There is a shrine to the goddess of justice here.\n- The shrine is guarded by a blue globe, although it is dim.',
        'ne': '21',
        'w': '19'
    },
    '21': {
        'text': 'You stand on a path sloping downwards from the southwest to the northeast. To the northeast, the path further downwards is lit by four-sided torches. Up to the southwest, the path is lit by circular lamps. You ignore the portal to the northwest.',
        'ne': '22',
        'sw': '20'
    },
    '22': {
        'text': 'The passage slopes gently upward to the southwest.  Tired from your journey, you decide to ignore the paths to the northeast, northwest, and southeast that leed deeper into the gloom, and return whence you came.\n\n- Before you leave, you pick up the roasted rat and flask of water you find in a corner, and tuck in.\n- You can rest here.\n- You also find two platinum pieces under the bag.',
        'sw': '21'
    },
    '23': {
        'text': 'You see piles of litter to the west. You rummage through them, finding nothing.\nPaths lead north, south, and west.  The path to the west soon slopes upwards to the south.  Directly to the south, on the same level, is a busy intersection.',
        'n': '24',
        's': '13',
        'w': '12'
    },
    '24': {
        'text': 'To the south is a busy intersection.\nPaths also lead north and east.',
        'e': '25',
        'n': '26',
        's': '23'
    },
    '25': {
        'text': 'You see a set of locked doors. You must be in the famed hall of King Monty! Except there seem to be more doors than usual. Disturbed, you return westward.',
        'w': '24'
    },
    '26': {
        'text': 'You see multiple signs: "THE HEADQUARTERS OF BEING." What does it all mean? To the north a sign warns of a small hole. You fail to see the relevance. Paths lead north, south, and east. The path to the east slopes downwards.\n\n- There is a mysterious blue light here.\n- You can rest here.\n- "Being" must be wealthy, as you spot two gold pieces just lying around.',
        'e': '27',
        'n': '35',
        's': '24'
    },
    '27': {
        'text': 'The floor of this large passage slopes gently from west to east.\nFrom here, you may go north, east, or west.\n\n- To the north, a few paces away, some dried fruit lies abandoned.\n- A small shrine to the goddess of wisdom lies forgotten in a corner.\n- A warm blue light shines to your west. \n- What really catches your eye, though, are four platinum pieces, You rejoice at your fortune.',
        'e': '28',
        'n': '33',
        'w': '26'
    },
    '28': {
        'text': 'You are in another busy intersection. A cavernous passage runs west to east.  A smaller path leads northeast.  You see a vertical shaft, but ignore it.',
        'e': '29',
        'ne': '30',
        'w': '27'
    },
    '29': {
        'text': 'You note numerous hitching posts here, and wonder who uses them. More importantly, you have hit another dead end. A path to the north ends in a portal, through which you dare not pass.  You have no choice but to return west.\n\n- The warm blue light you see once more is not at all comforting.',
        'w': '28'
    },
    '30': {
        'text': 'Paths lead west and southwest. You sense an ill omen about the portal to the east and decide not to enter it.\n\n- You can rest here.\n- There does not seem to be anything specia... wait -- is that... yes! Four platinum pieces!',
        'sw': '28',
        'w': '31'
    },
    '31': {
        'text': 'You see a multicolored wall. You suspect it is used for some nefarious purpose.\nThere is a portal immediately to the north, and a passage to the east.\n\n- You can rest here.',
        'e': '30',
        'n': '32'
    },
    '32': {
        'text': 'To the west is a white passage, ending in a portal.  Another portal opens to the south.  To the north is a great gate, but you feel the presence of a ferocious Qi guarding it. You cannot pass.',
        's': '31',
        'w': '33'
    },
    '33': {
        'text': 'This wide passage slopes gently upwards from the south to the north. You take stock of your options: north, up the slope; south; or through a portal to the east.\n\n- A blue orb illuminates the room brightly.\n- You find seven gold pieces. You take them. \n- Wait, something else is here too -- more treasure! You pocket three pieces of silver.',
        'e': '32',
        'n': '34',
        's': '27'
    },
    '34': {
        'text': "Another dead end; how annoying. The nest of noisy carrier pigeons in the corner is not helping. Once you get past your annoyance, you notice something odd -- three vertical shafts that might lead to the surface. Two seem normal, but the third looks like it is built for a giant! You spin around and see a tall, foreboding gate. You don't want to stay here.",
        's': '33'
    },
    '35': {
        'text': 'You stand in a maze of twisty little passages, all alike. To the north is a descent into further darkness. You are already in enough darkness, so you decide not to descend further.\nOther paths lead west and south.',
        's': '26',
        'w': '36'
    },
    '36': {
        'text': 'You see a playful air elemental, but decide it is best to keep a respectful distance.\nThis room is very hot. You wonder if there is also a fire elemental nearby.\nA short path ends to the north. You have no choice but to return east.\n\n- The air elemental giggles when it notices you staring warily at it. It tosses you forty-eight copper pieces before vanishing.',
        'e': '35'
    },
    '37': {
        'text': 'To the west, a path slopes upwards! However, at the entrance, there is a forbidding portrait. Actually, it is only forbidding because of a strong resemblance to the Grand Inquisitor. It seems to be judging you, and you decide not to tempt fate. You also ignore some smaller passages out of the gloom.\nPaths lead north and south. Both appear riddled with bright beams of light.\n\n- A blue globe hangs from the ceiling, but it does not glow.',
        'n': '11',
        's': '38'
    },
    '38': {
        'text': 'You find items that suggest that you are in the lair of a beholder, perhaps even a pair of beholders, judging by two long makeshift beds. \nTo the north, you see several sharp beams of light. You will have to proceed warily if you go in that direction, to avoid setting off any traps. Steps to the surface lead west, before turning south. Like a good adventurer, you ignore them. Another path to the west leads into the caverns.\n\n- Through a portal to the east, you see what must be the larder of the beholders -- a mountain of food and drink, probably scavenged from unfortunate adventurers who met them in these dark corridors. You hope to avoid their fate, and escape alive.\n- An alcove dedicated to the goddess of justice lies to the south.\n- Unable to overcome your greed, you pick up seven platinum pieces that were lying around. Finders keepers, losers weepers.',
        'e': '39',
        'n': '37',
        's': '41',
        'w': '43'
    },
    '39': {
        'text': 'To the west, the path goes through a portal before sloping upwards. The paths to the west and east are open to you. You pass several ways upward, but remain steadfast.  Then, to the north, you see a rather large door. Beyond the door, you notice that the passage is bright white and slopes downwards. This is far too unnatural, and you suddenly recall warnings from the Grand Inquisitor about foolish adventurers who enter passages such as these.\n\n- A little beyond the door-that-should-not-be-passed, you spot a mysterious blue light. \n- You spot four gold pieces and pick them up.',
        'e': '40',
        'w': '38'
    },
    '40': {
        'text': 'You have reached a dead end. The weight of generations of wisdom presses upon you. This is not a comfortable feeling, and you decide to hurry back west, ignoring a passage upwards.',
        'w': '39'
    },
    '41': {
        'text': 'The beams of light multiply the further you go. To the north and west, paths seem riddled with these sinister illuminations.',
        'n': '38',
        'w': '42'
    },
    '42': {
        'text': 'You have reached a dead end. The portal through which you have arrived opens onto a small area with two other portals, both closed off. \nTo the east, a sharp beam of light darts about. You hope to avoid it as you backtrack.\n\n- At least the trip here has not been wasted: you pick up nine gold pieces that were poorly concealed here.',
        'e': '41'
    },
    '43': {
        'text': 'From here, you may go east, where you spot a wall of slate, or north.\n\n- It feels safe to rest here.\n- The soft glow of a mysterious blue light illuminates the spot.\n- In a corner you spot a gold piece, which you pocket.',
        'e': '38',
        'n': '44'
    },
    '44': {
        'text': 'Yet another temptation to escape and discard your honor: the path to the east must be an illusion, cast by the denizens of these caverns to lure adventurers away. You are stronger than this!\nTwo paths lead away from here. To the south the path turns east.  To the north, several sharp beams of light guard the way.',
        'n': '45',
        's': '43'
    },
    '45': {
        'text': 'The path stretches north and south.\n\n- You see an alcove dedicated to the goddess of justice.',
        'n': '9',
        's': '44'
    },
    '46': {
        'text': 'Just to the west, you glimpse something that you suddenly thirst for -- escape to the surface! No, you must be tempted by neither comfort nor cowardice! As you steel yourself for the long quest ahead of you, you take stock of your surroundings. The ground is littered with rubble, and there are war chariots here. Thankfully, their charioteers are not.\nFrom here, the path slopes downwards to the north. There is also a path to the south.',
        'n': '47',
        's': '6'
    },
    '47': {
        'text': 'You stand in a maze of twisty little passages, all alike. You are surrounded by cages, but there are no animals in them. You wonder what they are for. The path to the west is filled the hum and buzz of dwarven machinery, and the sound wreaks havoc with your sense of direction. You do not want to meet its owners.\nFrom here, a path slopes upwards to the south, a dark passage leads to the east, or you can make a mad dash down the long path to the west, ignoring several short paths upwards and to the south.\n\n- It feels safe to rest here.\n- Despite your weariness, you are not too distracted to notice nine pieces of platinum nearby, which you surreptiously take.',
        'e': '48',
        's': '46',
        'w': '49'
    },
    '48': {
        'text': 'You see some cages. They are full of detritus; no animals can be seen.\nThe passage ends abruptly; you have no choice but to return west.',
        'w': '47'
    },
    '49': {
        'text': 'Through a portal to the east, you hear the hum and buzz of dwarven machinery. If you choose to go in that direction, you decide to run until you return to a junction, ignoring several short paths upwards and to the south, to avoid the owners of the machinery. The other alternative is a path to the north, which you notice veers west after a while.',
        'e': '47',
        'n': '50'
    },
    '50': {
        'text': 'Around you, the floor is littered with obstacles. To the west, you see a portal. Your curiosity gets the better of you, and you push through it, finding yourself in a dead end. There appear to be two more of the magicked vertical shafts threaten to lure you in, which you ignore. As you curse the annoyance of backtracking, you notice some features around you. The walls are surprisingly soft, and you feel compelled to touch them.  From here, you must return through the portal.\n\n- As you admire the surroundings, you find two gold pieces. You are happy that you will be able to pay your rent.',
        's': '49'
    },
    '51': {
        'text': 'You are at the top of a gently sloping passageway which slopes downwards towards the east. To the north, you catch a glimpse of the great outdoors, but you feel you must finish your quest before you can leave.\nFrom here, you may return east.',
        'e': '2'
    }
};
