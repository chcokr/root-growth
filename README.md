# root-growth

## What is this?

This webapp aims to provide a simulation of oscillatory behavior in the
Arabidopsis root, which underlies the formation of lateral root primordia.

Check out the demo at https://why-jay.github.io/root-growth.

This project is being developed as part of a research project at Duke
University's [Benfey Laboratory](http://sites.duke.edu/benfey/).

## Research proposal

Arabidopsis lateral roots form at periodic intervals along the main root.
Evidence suggests that the [activator-inhibitor
theory](http://engineering.ucsb.edu/~moehlis/APC514/2002_1.pdf) might explain
this periodic behavior.
In an activator-inhibitor system, a group of cells expresses an activator
protein and secretes an inhibiting mobile substance.
This substance represses its own expression and the expression of the activator.
As new cells form and the secreting cells move away from the inhibitor source
cells, the concentration and thus the effect of the inhibitor decline, allowing
a new phase of activator- and inhibitor-expressing cells.

The theory of activator-inhibitor systems has successfully explained a few
other biological systems.
Our computational model is designed to simulate the root growth and the periodic
behavior underlying lateral root initiation, using the partial differential
equations from the theory.
The formation of lateral roots in Arabidopsis shows a number of characteristics
that justify this approach.
For example, certain cells in the oscillation region express putative secreted
peptides, possibly to prevent neighboring cells from developing into lateral
roots or into peptide-secretors.
As new cells emerge in the root meristem, distal cells are exposed to a reducing
concentration of these inhibiting peptides, which might allow them to initiate a
new phase of peptide expression.
Additionally, these peptides should inhibit the expression of cell-autonomous
activators, which are assumed to prime the cells as competent to become lateral
root primordia.
The entire dynamic is described by two PDEs which we will use as the basis of
our in-silico model.

The objectives of the model are twofold.
First, it is expected to support biological observations.
Second, changing parameters can simulate various genetic manipulations, such as
removing the inhibiting substance to mimic a knockout.
Such simulations will help design and predict further experiments.

## License

The license for this repository has not yet been determined.
Until a license is specified, please visit
[choosealicense.com](http://choosealicense.com/licenses/no-license/) to learn
what you may or may not do with a repository on GitHub without a license.
