import glob
import os



def get_last_files_path(nb, path):
    list_of_files = glob.glob(f"{path}/*") # * means all if need specific format then *.csv
    print(path, flush=True)
    latest_files = sorted(list_of_files, key=os.path.getmtime, reverse=True)[:nb]
    print(f"[LOG]: List of files: {latest_files}", flush=True)
    return latest_files


if __name__ == "__main__":
    get_last_files_path(3)
