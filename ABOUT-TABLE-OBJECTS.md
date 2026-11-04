# About Me table artwork

Add four transparent PNG files in assets/about/:

- gallery-ticket.png
- contact-card.png (without LinkedIn/Gmail drawings)
- linkedin.png
- gmail.png

Export each on the same full canvas, dimensions and orientation as table.png.
Keep each object in its intended position. Do not crop to the object.
PNG alpha must be transparent outside the drawn object.

about-table-objects.js measures visible alpha bounds once each image loads.
It aligns the clickable target and hover pivot automatically, including when
an icon is moved within its frame. Each link has a minimum 44px target centered
on its drawing. Leave enough spacing between icons for these targets.

Until artwork is supplied, text links appear at temporary positions.
These positions are fallbacks, not the final drawing layout.

Ticket: gentle lift/tilt; opens paintings.html.
Card: gentle lift; separate LinkedIn/Gmail layers enlarge individually.
All images move with their targets. Keyboard focus is visible; reduced motion
disables movement. No changes to book page flipping or arrow interactions.

paintings.html contains an honest empty state until original paintings are added.
