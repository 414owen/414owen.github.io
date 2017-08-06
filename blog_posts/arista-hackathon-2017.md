<TOC 3>

### What hackathon?

I've been working at Arista Networks in Dublin for the summer, patching the
Linux kernel and writing kernel modules. It's a lot of fun. Needless to say,
there are a lot of very experienced, talented programmers in the office. The
hackathon was an internal one at Arista. It happened over all of our offices,
but separately, so our project wasn't compared to projects created in
Vancouver, for example.

The hackathon was a 24-hour one, 3pm on Thursday to 3pm on Friday, with voting
and prizes afterwards. There were a tonne of games and events organised, as
well as lots of food to keep us happy and relatively sane. There was a music
room, two board game rooms, pool / foosball tournaments, an overnight game of
assassin, Nerf-gun powered capture the flag tournaments, midnight screenings of
the IT crowd, pretty much everything a small army of programmers could want.

I did this hackathon on a team with a special piece of talent called [Brandon
Ibbotson](https://github.com/byxor/). He's the kind of guy who writes unit
tests for his unit tests. Enough said.

### What did we make?

As one of the few teams whose project was entirely unrelated to making kick-ass
network switches, I feel safe in revealing that we made a
[Slack](https://slack.com/)bot that can tell you when the pool table is free.
The reason we decided on this, is 100% because it was fun.

### How did we do the thing?

We had an infra-red sensor pointing towards the table, reading human movement.
This was connected to a little microcontroller I had lying around ([this
one](https://getchip.com/pages/chip)), which runs Linux, has GPIO, and has
Wi-Fi. This was enough to detect people and communicate with Slack. Perfect.

One annoying thing is that we didn't have a static IP, as we'd agreed that we
should host everything on the C.H.I.P., and Slack only allows you to implement
slash commands via a REST API, so instead we were using the realtime API
(websockets) to get every message, then scan for messages that read `pool?`.
This seems like a bit of unnecessary work for both the Slack servers and our
C.H.I.P., maybe Slack could in future let you subscribe only to certain events
via websockets, or just push slash commands via websockets?

The tasks that wasted our time most were actually the simplest ones. Connecting
to the C.H.I.P. through serial over USB on my MacBook Pro running Arch Linux,
getting WPA2-Enterprise Wi-Fi working on the C.H.I.P., reading from a GPIO pin
(still not sure what we were doing wrong for those 30 minutes), and figuring
out how to add a Slack integration to our team. Once these hurdles were out of
the way, I'd say we coded the thing in about 40 minutes.

Once we'd spent the night getting pinged by Nerf-gun foam bullets and other
such shenanigans, I grabbed a miniature box of Crunchy Nut cereal from the
Micro-Kitchen, ate the contents for breakfast, and used the box to create a
beautiful chassis for our hardware.

### The end result

![That's one classy chassis!](hackathon-cereal-box.jpg)

![On the wall, with its sensor poking out](hackathon-wall-sensor.jpg)

![Interacting with this masterpiece](hackathon-bot-screenshot.png)

### Did we win a thing?

Why yes, having focused entirely on having fun, and making the silliest
presentation we could, we won the 'Biggest Time Saver' category (there were
five categories). This was after we'd given a presentation with the words "To
be honest, the most time this will ever save you is around thirty seconds per
day, because the pool room is never too far away".
