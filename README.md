# root-growth

## What is this?

This webapp aims to provide a simulation of oscillatory behavior in the
Arabidopsis root, which underlies the formation of lateral root primordia.

Check out the demo at https://chcokr.github.io/root-growth.

This project is being developed as part of a research project at Duke
University's [Benfey Laboratory](http://sites.duke.edu/benfey/).

## Initial research proposal

Arabidopsis lateral roots form at periodic intervals along the main root.
Evidence suggests that the theory of
[activator-inhibitor systems](http://engineering.ucsb.edu/~moehlis/APC514/2002_1.pdf)
might explain this periodic behavior.
In such a system, there are initially a few cells that secrete an inhibiting
substance.
This substance represses its own expression in neighboring cells as well as the
expression of a local non-secreted activator.
As new cells form and the secreting cells move away from the inhibitor source
cells, the concentration and thus the effect of the inhibitor decline, allowing
a new phase of activator- and inhibitor-expressing cells.

This theory of activator-inhibitor systems has successfully explained a few
other biological systems.
Our computational model will help apply it to the periodic behavior in the root,
using some known partial differential equations from the theory.
The Arabidopsis root shows a number of characteristics that justify this
application.
For example, certain cells in the root express secreted peptides, which we
assume to prevent neighboring cells from developing into lateral roots or into
peptide-secretors.
As new cells emerge in the root meristem, distal cells are exposed to a reducing
concentration of the self-inhibiting peptides, which allows them to initiate a
new phase of inhibitor secretion and activator expression.
This activator is assumed to prime the cells as competent to become lateral root
primordia.

The objectives of the model are twofold.
First, it is expected to support biological observations.
Second, manipulation of its parameters will simulate various situations, such as
removing the inhibiting substance to mimic a knockout.
Such simulations will help design and predict further experiments.

## License

The license for this repository has not yet been determined.
Until a license is specified, please visit
[choosealicense.com](http://choosealicense.com/licenses/no-license/) to learn
what you may or may not do with a repository on GitHub without a license.
