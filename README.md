A command line utility for using chatGPT to make modifications to your project.
It's particularly good at refactors that are slightly more complicated than 
could be handled by a regex-based find and replace. 

To Use:
  - clone this
  - add refactorize to your $PATH
    - may also need to modify the shebang line at the start
      of refactorize to point at your node install location

  > npm install
  
  > cd ~/myproject
  
  > git stash
  - you probably won't want any uncommitted/unstaged changes when this runs
    so you can easily revert it if you don't like the result

  > refactorize "Buttons should be disabled when a modal is displayed unless they are in the modal itself"
  - this will return a list of files it wants to modify and ask you to proceed
    - you may need to modify the refactorize script to correctly
      include/exclude the right files from its search.
      Right now .js files are hardcoded to be the only things searched for
  - you can also use the following flags:
  > -f file/to/modify [to only modify the given file]

  > -s regex [to directly use this regex to find files instead of generating the grep]

  
  - if you approve of the files grepped, the instructions will be given to chatGPT for each file listed
    and it will be modified. and the `git diff` of that file will be printed
    so you can check its work
  - NOTE: files longer than ~200 lines will likely be too big and get truncated
    in the output :(
